import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, AccountService, AgreementService, Agreement, BillService, Bill, BillsConfirmComponent, BILL_STATUS, IOption, Filter } from 'bfs-library';
import { ExportBillsDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit, OnDestroy {

  public tabs: {label: string, status: number, filter: Filter, pageIndex: number, columns: string[]}[];
  public attentionTab: boolean;
  private selectedTab: number;
  public loaded: boolean;
  public data: {title: string, total: number, list: Bill[]};
  public dataColumns: string[];
  public selectColumns: string[];
  public selectedBills: Bill[];
  public options: {hospital: IOption[], insurance: IOption[], status: IOption[]};
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public billStatuses: {[key: number]: any};
  public canChangeBillStatus: any;
  private selectedAgreement: Agreement;
  public notificationsBadge: {
    value: number,
    color: string
  };
  private getNotificationsBadgeChangeEvent: any;
  public showPrev: boolean;
  public showNext: boolean;

  constructor(private dialog: MatDialog, private accountService: AccountService, private agreementService: AgreementService, private billService: BillService) {
    this.tabs = [];
    this.attentionTab = false;
    BFSApiService.havePermission('check_bills').then(() => this.attentionTab = true);
    this.loaded = false;
    this.data = {title: '', total: 0, list: []};
    this.dataColumns = ['status', 'key', 'hospital', 'insurance', 'chargesAmount'];
    BFSApiService.havePermission('get_bill').then(() => this.dataColumns.push('info'));
    this.selectColumns = [];
    this.selectedBills = [];
    this.options = {hospital: [], insurance: [], status: []};
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, status: []});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.billStatuses = BILL_STATUS;
    const permissions = BFSApiService.getPermissions();
    this.canChangeBillStatus = permissions.canChangeBillStatus;
    this.notificationsBadge = {value: 0, color: 'warn'};
    this.getNotificationsBadgeChangeEvent = this.billService.notificationsBadgeChangeEvent.subscribe( (value: number) => {
      if (value) {
        this.notificationsBadge.value = value;
      }
    });
    this.showPrev = false;
    this.showNext = false;
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount();
    this.options.status = account['options'].billStatus;
    Promise
      .all([this.agreementService.getHospitalOptions(), this.agreementService.getInsuranceOptions()])
      .then((values: any[]) => {
        this.options.hospital = values[0];
        this.options.insurance = values[1];
        this.filter.fields = {hospital: this.options.hospital[0] ? this.options.hospital[0].value : -1, insurance: this.options.insurance[0] ? this.options.insurance[0].value : -1, from: -1, to: -1};
        if (account['billTabs'].length) {
          const fields = {...this.filter.fields};
          account['billTabs'].forEach((status: number) => {
            this.tabs.push({
              label: BILL_STATUS[status].value,
              status,
              filter: new Filter({...fields, status: [status]}),
              pageIndex: 0,
              columns: ['select', ...this.dataColumns]
            });
          });
          this.tabs.push({
            label: 'All bills',
            status: -1,
            filter: this.filter,
            pageIndex: 0,
            columns: this.dataColumns
          });
          this.selectedTab = 0;
        }
        this.onCounterpartyChange();
      });
  }

  loadBills(): void {
    const params = this.tabs.length ? this.tabs[this.selectedTab].filter.getSelectedFields() : this.filter.getSelectedFields();
    // this.data = {title: '', total: 0, list: []};
    this.loaded = false;
    this.billService.getBills(params).then((data: {total: number, list: Bill[]}) => {
      let title = '';
      if (params['from'] && params['to']) {
        title = `${new Date(params['from']).toDateString()} - ${new Date(params['to']).toDateString()}`;
      }
      this.data = {...data, title};
      this.loaded = true;
    });
  }

  onCounterpartyChange(): void {
    const filter = this.tabs.length ? this.tabs[this.selectedTab].filter : this.filter;
    const hospital = filter.fields['hospital'] as number;
    const insurance = filter.fields['insurance'] as number;
    this.agreementService.getAgreementByCounterparties(hospital, insurance).then((data: Agreement) => {
      this.selectedAgreement = data;
      if (this.selectedAgreement) {
        const dates = BillService.calculateCurrentInterval(this.selectedAgreement.transactionInterval);
        filter.fields = {from: dates.from, to: dates.to};
        this.checkIntervals();
      } else {
        filter.fields = {from: -1, to: -1};
        this.showPrev = false;
        this.showNext = false;
      }
      this.loadBills();
    });
  }

  prevInterval(): void {
    if (this.tabs.length) {
      const newDates = this.getPrevInterval(this.tabs[this.selectedTab].filter);
      this.tabs[this.selectedTab].filter.fields = {offset: 0, from: newDates.from, to: newDates.to};
      this.tabs[this.selectedTab].pageIndex = 0;
    } else {
      const newDates = this.getPrevInterval(this.filter);
      this.filter.fields = {offset: 0, from: newDates.from, to: newDates.to};
      this.pageIndex = 0;
    }
    this.checkIntervals();
    this.loadBills();
  }

  private getPrevInterval(filter: Filter): {from: string, to: string} {
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculatePrevInterval(from, to, this.selectedAgreement.transactionInterval);
  }

  nextInterval(): void {
    if (this.tabs.length) {
      const newDates = this.getNextInterval(this.tabs[this.selectedTab].filter);
      this.tabs[this.selectedTab].filter.fields = {offset: 0, from: newDates.from, to: newDates.to};
      this.tabs[this.selectedTab].pageIndex = 0;
    } else {
      const newDates = this.getNextInterval(this.filter);
      this.filter.fields = {offset: 0, from: newDates.from, to: newDates.to};
      this.pageIndex = 0;
    }
    this.checkIntervals();
    this.loadBills();
  }

  private getNextInterval(filter: Filter): {from: string, to: string} {
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculateNextInterval(from, to, this.selectedAgreement.transactionInterval);
  }

  checkIntervals(): void {
    const filter = this.tabs.length ? this.tabs[this.selectedTab].filter : this.filter;
    if (this.selectedAgreement) {
      const createdDate = new Date(this.selectedAgreement.createdAt).toISOString().split('T')[0];
      this.showPrev = createdDate < filter.fields['from'];
      const currentDate = new Date().toISOString().split('T')[0];
      this.showNext = currentDate > filter.fields['to'];
    } else {
      this.showPrev = false;
      this.showNext = false;
    }
  }

  onTabChanged($event): void {
    if (!this.attentionTab || (this.attentionTab && $event.index !== 0)) {
      this.selectedTab = this.attentionTab ? $event.index - 1 : $event.index;
      this.selectedBills = [];
      const hospital = this.tabs[this.selectedTab].filter.fields['hospital'] as number;
      const insurance = this.tabs[this.selectedTab].filter.fields['insurance'] as number;
      this.agreementService.getAgreementByCounterparties(hospital, insurance).then((data: Agreement) => {
        this.selectedAgreement = data;
        if (this.selectedAgreement) {
          if (this.tabs[this.selectedTab].filter.fields['from'] === -1 && this.tabs[this.selectedTab].filter.fields['to'] === -1) {
            const dates = BillService.calculateCurrentInterval(this.selectedAgreement.transactionInterval);
            this.tabs[this.selectedTab].filter.fields = {from: dates.from, to: dates.to};
          }
          this.checkIntervals();
        } else {
          this.tabs[this.selectedTab].filter.fields = {from: -1, to: -1};
          this.showPrev = false;
          this.showNext = false;
        }
        this.loadBills();
      });
    }
  }

  handlePage(event): void {
    if (this.tabs.length) {
      this.tabs[this.selectedTab].filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
      this.tabs[this.selectedTab].pageIndex = event.pageIndex;
    } else {
      this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
      this.pageIndex = event.pageIndex;
    }
    this.loadBills();
  }

  changeStatus(status, title): void {
    const dialogRef = this.dialog.open(BillsConfirmComponent, {data: {bills: this.selectedBills, status, title}, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe(result => { if (result) { this.selectedBills = []; this.loadBills(); } });
  }

  exportBills(): void {
    const params = this.tabs.length ? this.tabs[this.selectedTab].filter.getSelectedFields() : this.filter.getSelectedFields();
    const {offset, count, ...exportParams} = params as any;
    this.dialog.open(ExportBillsDialogComponent, {data: {params: exportParams}, width: '500px', disableClose: true, panelClass: 'relative'});
  }

  ngOnDestroy(): void {
    this.getNotificationsBadgeChangeEvent.unsubscribe();
  }
}
