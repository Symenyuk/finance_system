import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, AccountService, InsuranceService, BillService, Bill, BillsConfirmComponent, BILL_STATUS, IOption, Filter, RoleType } from 'bfs-library';

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
  public selectedBills: Bill[];
  public options: {hospital: IOption[]};
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public billStatuses: {[key: number]: any};
  public canChangeBillStatus: any;
  public notificationsBadge: {value: number, color: string};
  private getNotificationsBadgeChangeEvent: any;
  public showPrev: boolean;
  public showNext: boolean;

  constructor(private dialog: MatDialog, private accountService: AccountService, private insuranceService: InsuranceService, private billService: BillService) {
    this.tabs = [];
    this.attentionTab = false;
    BFSApiService.havePermission('check_bills').then(() => this.attentionTab = true);
    this.loaded = false;
    this.data = {title: '', total: 0, list: []};
    this.dataColumns = [];
    this.selectedBills = [];
    this.options = {hospital: []};
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, hospital: -1, policy_number: '', patient_name: '', patient_mobile: '', status: [21, 30, 40, 41, 42, 43, 44, 45, 50, 60, 70, 80, 81, 90, 91]});
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
    switch (account.role) {
      case RoleType.INSURANCE_ADMINISTRATOR: this.dataColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_AUDIT: this.dataColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_AUDIT_MANAGER: this.dataColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_FINANCE_MANAGER: this.dataColumns = ['status', 'key', 'insurance', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      default: this.dataColumns = ['status', 'key', 'insurance', 'discount', 'cost', 'paid', 'remain', 'info']; break;
    }
    this.insuranceService.getHospitalOptions().then((value: IOption[]) => {
      this.options.hospital = value;
      const dates = BillService.calculateCurrentInterval(this.options.hospital[0].original.agreement_interval);
      this.filter.fields = {hospital: this.options.hospital[0].value, from: dates.from, to: dates.to};
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
      this.checkIntervals();
      this.loadHistory(); // TODO promise
    });
    // this.loadHistory();
  }

  loadHistory(): void {
    const params = this.tabs.length ? this.tabs[this.selectedTab].filter.getSelectedFields() : this.filter.getSelectedFields();
    // this.data = {title: '', total: 0, list: []};
    this.loaded = false;
    this.billService.getBills(params).then((bills: {total: number, list: Bill[]}) => {
      let title = '';
      if (params['from'] && params['to']) {
        title = `${new Date(params['from']).toDateString()} - ${new Date(params['to']).toDateString()}`;
      }
      this.data = {...bills, title};
      this.loaded = true;
    });
  }

  onHospitalChange(): void {
    if (this.tabs.length) {
      const selectedHospital = this.options.hospital.find((hospital: IOption) => hospital.value === this.tabs[this.selectedTab].filter.fields['hospital']);
      const dates = BillService.calculateCurrentInterval(selectedHospital.original.agreement_interval);
      this.tabs[this.selectedTab].filter.fields = {from: dates.from, to: dates.to};
    } else {
      const selectedHospital = this.options.hospital.find((hospital: IOption) => hospital.value === this.filter.fields['hospital']);
      const dates = BillService.calculateCurrentInterval(selectedHospital.original.agreement_interval);
      this.filter.fields = {from: dates.from, to: dates.to};
    }
    this.loadHistory();
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
    this.loadHistory();
  }

  private getPrevInterval(filter: Filter): {from: string, to: string} {
    const selectedHospital = this.options.hospital.find((hospital: IOption) => hospital.value === filter.fields['hospital']);
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculatePrevInterval(from, to, selectedHospital.original.agreement_interval);
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
    this.loadHistory();
  }

  private getNextInterval(filter: Filter): {from: string, to: string} {
    const selectedHospital = this.options.hospital.find((hospital: IOption) => hospital.value === filter.fields['hospital']);
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculateNextInterval(from, to, selectedHospital.original.agreement_interval);
  }

  checkIntervals(): void {
    const filter = this.tabs.length ? this.tabs[this.selectedTab].filter : this.filter;
    const selectedHospital = this.options.hospital.find((hospital: IOption) => hospital.value === filter.fields['hospital']);
    if (selectedHospital) {
      const createdDate = new Date(selectedHospital.original.agreement_created).toISOString().split('T')[0];
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
      this.checkIntervals();
      this.loadHistory();
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
    this.loadHistory();
  }

  changeStatus(status, title): void {
    const dialogRef = this.dialog.open(BillsConfirmComponent, {data: {bills: this.selectedBills, status, title}, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe(result => { if (result) { this.selectedBills = []; this.loadHistory(); } });
  }

  ngOnDestroy(): void {
    this.getNotificationsBadgeChangeEvent.unsubscribe();
  }

}
