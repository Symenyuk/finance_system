import { Component, OnInit, OnDestroy } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, AgreementService, Filter, ConfirmationComponent, ExportInvoiceComponent } from 'bfs-library';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {

  public loaded: boolean;
  public data: {total: number, list: any[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public selection: SelectionModel<any>;
  public notificationsBadge: {value: number, color: string};
  private getNotificationsBadgeChangeEvent: any;

  constructor(private dialog: MatDialog, private agreementService: AgreementService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['select', 'insurance', 'date', 'interval', 'cost', 'number', 'amount', 'status'];
    const now = new Date();
    const from = new Date(now.setMonth(now.getMonth() - 2)).toISOString().split('T')[0];
    const to = new Date().toISOString().split('T')[0];
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, from, to});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.selection = new SelectionModel<any>(true, []);
    this.notificationsBadge = {value: 0, color: 'warn'};
    this.getNotificationsBadgeChangeEvent = this.agreementService.notificationsBadgeChangeEvent.subscribe( (value: number) => {
      if (value) {
        this.notificationsBadge.value = value;
      }
    });
  }


  ngOnInit(): void {
    this.loadInvoices(true);
  }

  onTabChanged($event): void {
    const idx = $event.index;
    if (idx === 0) {
      this.loadInvoices(true);
    } else {
      this.loadInvoices(false);
    }

    // if (!this.attentionTab || (this.attentionTab && $event.index !== 0)) {
    //   this.selectedTab = this.attentionTab ? $event.index - 1 : $event.index;
    //   this.selectedBills = [];
    //   this.checkIntervals();
    //   this.loadHistory();
    // }
  }

  loadInvoices(attention): void {
    const params = this.filter.getSelectedFields();
    if (attention === true) {
      this.agreementService.checkInvoices(params).then((invoices: {total: number, list: any[]}) => {
        this.data = invoices;
        this.loaded = true;
        this.notificationsBadge.value = invoices.total;
      });
    } else {
      this.agreementService.getInvoices(params).then((data: {total: number, list: any[]}) => {
        this.data = data;
        this.loaded = true;
      });
    }
  }

  onDateChange(e, field: string): void {
    const checkDate = (value: number): string => {
      return value < 10 ? `0${value}` : `${value}`;
    };
    this.filter.fields = {[field]: `${e.value.getFullYear()}-${checkDate(e.value.getMonth() + 1)}-${checkDate(e.value.getDate())}`};
    this.loadInvoices(false);
  }

  masterToggle(): void {
    if (this.selection.selected.length === this.data.list.length) {
      this.selection.clear();
    } else {
      this.data.list.forEach(row => this.selection.select(row));
    }
  }

  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.selection.selected.length === this.data.list.length ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id}`;
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadInvoices(false);
  }

  changeStatus(id: number): void {
    const title = `Change invoice status`;
    const content = `Are you sure you want to change invoice status to Paid.`;
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { this.agreementService.patchInvoiceStatus(id, 1).then(() => this.loadInvoices(true)); }
    });
  }

  exportInvoice(): void {
    const ids = this.selection.selected.map((invoice: any) => invoice.id);
    this.dialog.open(ExportInvoiceComponent, {data: {params: {invoices: ids}}, width: '500px', disableClose: true, panelClass: 'relative'});
  }

  ngOnDestroy(): void {
    this.getNotificationsBadgeChangeEvent.unsubscribe();
  }
}
