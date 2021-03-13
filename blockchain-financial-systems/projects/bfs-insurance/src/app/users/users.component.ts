import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BFSConfigService, BFSApiService, AccountService, InsuranceAccount, Filter, CreateAccountComponent } from 'bfs-library';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: InsuranceAccount[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private accountService: AccountService, private dialog: MatDialog) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['status', 'name', 'login', 'role'];
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    const params = this.filter.getSelectedFields();
    this.accountService.getInsuranceAccounts(params).then((accounts: {total: number, list: InsuranceAccount[]}) => {
      this.data = accounts;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadUsers();
  }

  create(): void {
    BFSApiService.havePermission('register').then(() => {
      const account = this.accountService.getAccount() as InsuranceAccount;
      const dialogRef = this.dialog.open(CreateAccountComponent, {data: {insurance: account.insurance.id}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: string) => { if (result) { this.loadUsers(); } });
    });
  }

}
