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
      case RoleType.INSURANCE_ADMINISTRATOR: this.billsColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_AUDIT: this.billsColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_AUDIT_MANAGER: this.billsColumns = ['status', 'key', 'insurance', 'insuranceApproval', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      case RoleType.INSURANCE_FINANCE_MANAGER: this.billsColumns = ['status', 'key', 'insurance', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
      default: this.billsColumns = ['status', 'key', 'insurance', 'discount', 'cost', 'paid', 'remain', 'history', 'info']; break;
    }
    this.updateInterval = setInterval(() => this.loadBills(), 60000);
    this.loadBills();
  }

  loadBills(): void {
    const params = {offset: 0, count: BFSConfigService.settings.pageSize.dashboard};
    const status = [21, 30, 40, 41, 42, 43, 44, 45, 50, 60, 70, 80, 81, 90, 91];
    this.billService.getBills({...params, status}).then((bills: {total: number, list: Bill[]}) => {
      this.bills = bills;
      this.loaded = true;
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.updateInterval);
  }

}
