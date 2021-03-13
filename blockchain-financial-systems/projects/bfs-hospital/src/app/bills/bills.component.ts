import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, AccountService, HospitalService, BillService, Bill, BillsConfirmComponent, BILL_STATUS, IOption, Filter, RoleType } from 'bfs-library';
import { CreateBillDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss']
})
export class BillsComponent implements OnInit {

  public tabs: {label: string, status: number, filter: Filter, pageIndex: number, columns: string[]}[];
  private selectedTab: number;
  public loaded: boolean;
  public data: {title: string, total: number, list: Bill[]};
  public dataColumns: string[];
  public selectedBills: Bill[];
  public options: {branch?: IOption[], insurance?: IOption[], service?: IOption[], status?: IOption[]};
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public billStatuses: {[key: number]: any};
  public canChangeBillStatus: any;
  public showPrev: boolean;
  public showNext: boolean;

  constructor(private dialog: MatDialog, private api: BFSApiService, private accountService: AccountService, private hospitalService: HospitalService, private billService: BillService) {
    this.tabs = [];
    this.loaded = false;
    this.data = {title: '', total: 0, list: []};
    this.dataColumns = [];
    this.selectedBills = [];
    this.options = {};
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, patient_mobile: ''});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.billStatuses = BILL_STATUS;
    const permissions = BFSApiService.getPermissions();
    this.canChangeBillStatus = permissions.canChangeBillStatus;
    this.showPrev = false;
    this.showNext = false;
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount();
    this.options.status = account['options'].billStatus;
    switch (account.role) {
      case RoleType.HOSPITAL_ADMINISTRATOR:
        this.dataColumns = ['status', 'created', 'insurance', 'approval', 'service', 'paid', 'remain', 'info'];
        this.filter.fields = {branch: -1, insurance: -1, patient_name: '', doctor_name: '', service: 'all', status: []};
        break;
      case RoleType.HOSPITAL_TELLER:
        this.dataColumns = ['status', 'created', 'insurance', 'patient', 'mobile', 'approval', 'paid', 'remain', 'info'];
        this.filter.fields = {patient_name: ''};
        break;
      case RoleType.HOSPITAL_FINANCE:
        this.dataColumns = ['status', 'key', 'teller', 'insurance', 'policy', 'discount', 'cost', 'paid', 'remain', 'history', 'info'];
        this.filter.fields = {branch: -1, insurance: -1, policy_number: '', policy_type: ''};
        break;
      case RoleType.HOSPITAL_FINANCE_MANAGER:
        this.dataColumns = ['status', 'key', 'teller', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info'];
        this.filter.fields = {branch: -1, insurance: -1, policy_number: ''};
        break;
      default:
        this.dataColumns = ['status', 'key', 'insurance', 'created', 'approval', 'discount', 'cost', 'paid', 'remain', 'info'];
        break;
    }
    this.hospitalService.getBranchOptions().then((options: IOption[]) => {
      this.options.branch = options;
      this.options.branch.unshift({value: -1, label: 'All'});
    });
    this.hospitalService.getInsuranceOptions()
      .then((options: IOption[]) => {
        this.options.insurance = options;
        const dates = BillService.calculateCurrentInterval(this.options.insurance[0].original.agreement_interval);
        this.filter.fields = {insurance: this.options.insurance[0].value, from: dates.from, to: dates.to};
      })
      .finally(() => {
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
    if (account.role === RoleType.HOSPITAL_ADMINISTRATOR) {
      this.hospitalService.getServiceOptions().then((options: IOption[]) => {
        this.options.service = options;
        this.options.service.unshift({value: 'all', label: 'All'});
      });
    }
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

  onInsuranceChange(): void {
    if (this.tabs.length) {
      const selectedInsurance = this.options.insurance.find((insurance: IOption) => insurance.value === this.tabs[this.selectedTab].filter.fields['insurance']);
      const dates = BillService.calculateCurrentInterval(selectedInsurance.original.agreement_interval);
      this.tabs[this.selectedTab].filter.fields = {from: dates.from, to: dates.to};
    } else {
      const selectedInsurance = this.options.insurance.find((insurance: IOption) => insurance.value === this.filter.fields['insurance']);
      const dates = BillService.calculateCurrentInterval(selectedInsurance.original.agreement_interval);
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
    const selectedInsurance = this.options.insurance.find((insurance: IOption) => insurance.value === filter.fields['insurance']);
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculatePrevInterval(from, to, selectedInsurance.original.agreement_interval);
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
    const selectedInsurance = this.options.insurance.find((insurance: IOption) => insurance.value === filter.fields['insurance']);
    const from = new Date(filter.fields['from'] as string);
    const to = new Date(filter.fields['to'] as string);
    return BillService.calculateNextInterval(from, to, selectedInsurance.original.agreement_interval);
  }

  checkIntervals(): void {
    const filter = this.tabs.length ? this.tabs[this.selectedTab].filter : this.filter;
    const selectedInsurance = this.options.insurance.find((insurance: IOption) => insurance.value === filter.fields['insurance']);
    if (selectedInsurance) {
      const createdDate = new Date(selectedInsurance.original.agreement_created).toISOString().split('T')[0];
      this.showPrev = createdDate < filter.fields['from'];
      const currentDate = new Date().toISOString().split('T')[0];
      this.showNext = currentDate > filter.fields['to'];
    } else {
      this.showPrev = false;
      this.showNext = false;
    }
  }

  onTabChanged($event): void {
    this.selectedTab = $event.index;
    this.selectedBills = [];
    this.checkIntervals();
    this.loadHistory();
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

  createBill(): void {
    BFSApiService.havePermission('create_bill').then(() => {
      const dialogRef = this.dialog.open(CreateBillDialogComponent, {width: '750px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => { if (result) { this.loadHistory(); } });
    });
  }

  changeStatus(status, title): void {
    const dialogRef = this.dialog.open(BillsConfirmComponent, {data: {bills: this.selectedBills, status, title}, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe(result => { if (result) { this.selectedBills = []; this.loadHistory(); } });
  }

}
