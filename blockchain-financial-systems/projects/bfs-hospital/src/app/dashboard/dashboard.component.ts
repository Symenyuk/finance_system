import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, AccountService, BillService, Bill, RoleType } from 'bfs-library';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public loaded: boolean;
  public bills: {total: number, list: Bill[]};
  public billsColumns: string[];
  public updateInterval: any;

  constructor(private dialog: MatDialog, private accountService: AccountService, private billService: BillService) {
    this.loaded = false;
    this.bills = {total: 0, list: []};
    this.billsColumns = [];
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount();
    switch (account.role) {
      case RoleType.HOSPITAL_ADMINISTRATOR: this.billsColumns = ['status', 'created', 'insurance', 'approval', 'service', 'paid', 'remain', 'info']; break;
      case RoleType.HOSPITAL_TELLER: this.billsColumns = ['status', 'created', 'insurance', 'patient', 'mobile', 'approval', 'paid', 'remain', 'info']; break;
      case RoleType.HOSPITAL_FINANCE: this.billsColumns = ['status', 'key', 'teller', 'insurance', 'policy', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.HOSPITAL_FINANCE_MANAGER: this.billsColumns = ['status', 'key', 'teller', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      default: this.billsColumns = ['status', 'key', 'insurance', 'created', 'approval', 'discount', 'cost', 'paid', 'remain', 'info']; break;
    }
    this.updateInterval = setInterval(() => this.loadBills(), 60000);
    this.loadBills();
  }

  loadBills(): void {
    const params = {offset: 0, count: BFSConfigService.settings.pageSize.dashboard};
    this.billService.getBills(params).then((bills: {total: number, list: Bill[]}) => {
      this.bills = bills;
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

}
