import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { BFSApiService, BillService, Bill, BillHistoryComponent, BillDetailsComponent } from 'bfs-library';

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.scss']
})
export class BillsTableComponent implements OnDestroy {

  @Input()
  public set list(bills: Bill[]) {
    this.bills = bills;
    this.checkBills();
    this.selection.clear();
  }
  @Input() title: string;
  @Input() total: number;
  @Input() columns: string[];
  @Input() loaded: boolean;
  @Output() update: EventEmitter<boolean>;
  @Output() selected: EventEmitter<Bill[]>;
  public bills: Bill[];
  public selection: SelectionModel<Bill>;
  private loadTimeout: any;

  constructor(private dialog: MatDialog, private billService: BillService) {
    this.selection = new SelectionModel<Bill>(true, []);
    this.update = new EventEmitter<boolean>();
    this.selected = new EventEmitter<Bill[]>();
  }

  checkBills(): void {
    if (this.bills.some((bill) => bill.blocked)) {
      this.loadTimeout = setTimeout(() => this.reloadBills(), 5000);
    } else {
      clearTimeout(this.loadTimeout);
    }
  }

  reloadBills(): void {
    const billsToReload = this.bills.filter((bill) => bill.blocked);
    Promise.all(billsToReload.map((bill) => this.billService.getBill(bill.id))).then((values) => {
      const statuses = values.reduce((obj, bill: Bill) => {
        obj[bill.id] = {status: bill.status, networkStatus: bill.networkStatus};
        return obj;
      }, {});
      this.bills.forEach((bill: Bill) => {
        if (statuses.hasOwnProperty(bill.id)) {
          Object.assign(bill, statuses[bill.id]);
        }
      });
      this.checkBills();
    });
  }

  masterToggle(): void {
    this.selection.selected.length === this.bills.length ? this.selection.clear() : this.bills.filter(row => !row.blocked).forEach(row => this.selection.select(row));
    this.selected.emit(this.selection.selected);
  }

  checkboxToggle(row: Bill): void {
    this.selection.toggle(row);
    this.selected.emit(this.selection.selected);
  }

  checkboxLabel(row?: Bill): string {
    if (!row) {
      return `${this.selection.selected.length === this.bills.length ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.key}`;
  }

  showHistory(key: string): void {
    BFSApiService.havePermission('get_bill_history').then(() => {
      this.dialog.open(BillHistoryComponent, {data: {key}, panelClass: 'relative', width: '750px', disableClose: true});
    });
  }

  showDetails(id: number): void {
    BFSApiService.havePermission('get_bill').then(() => {
      const dialogRef = this.dialog.open(BillDetailsComponent, {data: id, panelClass: 'relative', width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => { if (result) { this.update.emit(true); } });
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.loadTimeout);
  }

}
