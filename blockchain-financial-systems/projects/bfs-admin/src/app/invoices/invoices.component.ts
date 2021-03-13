import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, AgreementService, Filter, IOption, ConfirmationComponent, ExportInvoiceComponent } from 'bfs-library';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: any[]};
  public dataColumns: string[];
  public options: {
    hospital: IOption[];
  };
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public selection: SelectionModel<any>;

  constructor(private dialog: MatDialog, private agreementService: AgreementService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['select', 'insurance', 'date', 'interval', 'statuses', 'cost', 'number', 'amount', 'status'];
    this.options = {hospital: []};
    const now = new Date();
    const from = new Date(now.setMonth(now.getMonth() - 2)).toISOString().split('T')[0];
    const to = new Date().toISOString().split('T')[0];
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, hospital: -1, from, to});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.selection = new SelectionModel<any>(true, []);
  }

  ngOnInit(): void {
    this.agreementService.getHospitalOptions().then((hospitals: IOption[]) => {
      this.options.hospital = hospitals;
      if (this.options.hospital.length) {
        this.filter.fields = {hospital: this.options.hospital[0].value};
        this.loadInvoices();
      }
    });
  }

  loadInvoices(): void {
    const params = this.filter.getSelectedFields();
    this.agreementService.getInvoices(params).then((data: {total: number, list: any[]}) => {
      this.data = data;
      this.loaded = true;
    });
  }

  onDateChange(e, field: string): void {
    const checkDate = (value: number): string => {
      return value < 10 ? `0${value}` : `${value}`;
    };
    this.filter.fields = {[field]: `${e.value.getFullYear()}-${checkDate(e.value.getMonth() + 1)}-${checkDate(e.value.getDate())}`};
    this.loadInvoices();
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
    this.loadInvoices();
  }

  changeStatus(id: number): void {
    const title = `Change invoice status`;
    const content = `Are you sure you want to change invoice status to Received.`;
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) { this.agreementService.patchInvoiceStatus(id, 2).then(() => this.loadInvoices()); }
    });
  }

  exportInvoice(): void {
    const ids = this.selection.selected.map((invoice: any) => invoice.id);
    this.dialog.open(ExportInvoiceComponent, {data: {params: {invoices: ids}}, width: '500px', disableClose: true, panelClass: 'relative'});
  }

}
