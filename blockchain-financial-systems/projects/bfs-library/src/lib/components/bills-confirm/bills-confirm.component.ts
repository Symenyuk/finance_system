import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSApiService } from '../../services/bfs-api.service';
import { BillService } from '../../services/bfs-bill.service';
import { IBillStatuses } from '../../models/api.model';
import { Bill, BILL_STATUS } from '../../models/bill.model';

@Component({
  selector: 'lib-bills-confirm',
  templateUrl: './bills-confirm.component.html',
  styleUrls: ['./bills-confirm.component.scss', '../components.scss']
})
export class BillsConfirmComponent implements OnInit {

  public processing: boolean;
  public finished: boolean;
  public count: number;
  public finishedCount: number;
  public errors: Error[];
  private bills: Bill[];

  constructor(@Inject(MAT_DIALOG_DATA) public data, private ref: MatDialogRef<BillsConfirmComponent>, private service: BillService) {
    this.processing = false;
    this.finished = false;
    if (data && data.hasOwnProperty('bills') && data.hasOwnProperty('status')) {
      this.count = data.bills.length;
      this.finishedCount = 0;
      this.bills = data.bills;
    } else {
      ref.close();
    }
  }

  ngOnInit() {}

  update() {
    this.processing = true;
    this.updateRecursive();
  }

  updateRecursive() {
    if (!this.finished) {
      const bill = this.bills[this.finishedCount];
      this.service
        .patchStatus(bill.id, {status: this.data.status, oldStatus: bill.status, bill_key: bill.key}, true)
        .then(() => {
          this.finishedCount++;
          this.finished = this.finishedCount === this.count;
          this.updateRecursive();
        })
        .catch((errors: Error[]) => {
          this.errors = errors;
          this.processing = false;
          this.service.checkNotificationsBadge();
        });
    } else {
      this.processing = false;
      this.service.checkNotificationsBadge();
    }
  }

}
