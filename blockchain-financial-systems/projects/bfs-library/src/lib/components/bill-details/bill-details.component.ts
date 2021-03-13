import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSApiService } from '../../services/bfs-api.service';
import { BillService } from '../../services/bfs-bill.service';
import { IBillStatuses } from '../../models/api.model';
import { Bill, BillHistory, BILL_STATUS } from '../../models/bill.model';
import { BillMessageComponent } from '../bill-message/bill-message.component';

@Component({
  selector: 'lib-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss', '../components.scss']
})
export class BillDetailsComponent implements OnInit, OnDestroy {

  public processing: boolean;
  public bill: Bill;
  public billStatus: string;
  public billStatuses: {[key: number]: any};
  public canChangeBillStatus: IBillStatuses;
  public lastUpdate: string;
  private getTimeout: any;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<BillDetailsComponent>, private snack: MatSnackBar, private service: BillService) {
    this.processing = false;
    this.billStatuses = BILL_STATUS;
    const permissions = BFSApiService.getPermissions();
    this.canChangeBillStatus = permissions.canChangeBillStatus as IBillStatuses;
  }

  ngOnInit(): void {
    this.getBill();
  }

  getBill(): void {
    this.service.getBill(this.data).then((bill: Bill) => {
      this.bill = bill;
      this.billStatus = this.bill.status !== undefined ? BILL_STATUS[this.bill.status].message : 'Indefinite status';
      BFSApiService.havePermission('get_bill_history')
        .then(() => this.service.getBillHistory(this.bill.key))
        .then((history: BillHistory[]) => {
          let transactions = history.filter((item: BillHistory) => item.status === this.bill.status);
          if (transactions.length) {
            transactions = transactions.sort((a: BillHistory, b: BillHistory) => b.updatedAt - a.updatedAt);
            const time = new Date(transactions[0].updatedAt).toLocaleString();
            const who = transactions[0].who;
            const status = transactions[0].statusValue;
            const message = transactions[0].message ? `with message '${transactions[0].message}'` : '';
            this.lastUpdate = `Updated at ${time} by ${who} to '${status}' status ${message}`.trim();
          }
        });
      if (this.bill.blocked) {
        this.getTimeout = setTimeout(() => this.getBill(), 5000);
      } else {
        clearTimeout(this.getTimeout);
      }
    });
  }

  changeStatus(status: number): void {
    this.processing = true;
    const needMessage = [22, 40, 42, 44, 50, 81];
    const snackMessage = `Request to change status from ${this.bill.statusValue} to ${this.billStatuses[status].value} has been sent`;
    const snackOptions = {
      duration: 5000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition
    };
    const request = (params: any): void => {
      this.service
        .patchStatus(this.data, params)
        .then(() => {
          this.ref.close(true);
          this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'success-snack'});
        })
        .catch((errors: Error[]) => {
          this.processing = false;
          this.snack.open(errors[0].message, 'Hide', {...snackOptions, panelClass: 'error-snack'});
        });
    };
    if (needMessage.includes(status)) {
      const dialogRef = this.dialog.open(BillMessageComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((msg: string) => {
        if (msg) {
          request({status, oldStatus: this.bill.status, bill_key: this.bill.key, msg});
        } else {
          this.processing = false;
        }
      });
    } else {
      request({status, oldStatus: this.bill.status, bill_key: this.bill.key});
    }
  }

  ngOnDestroy(): void {
    clearTimeout(this.getTimeout);
  }

}
