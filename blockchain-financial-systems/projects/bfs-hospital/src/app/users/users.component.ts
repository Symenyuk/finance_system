import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { BFSConfigService, BFSApiService, AccountService, HospitalAccount, Filter, CreateAccountComponent } from 'bfs-library';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: HospitalAccount[]};
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
    this.accountService.getHospitalAccounts(params).then((accounts: {total: number, list: HospitalAccount[]}) => {
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
      const account = this.accountService.getAccount() as HospitalAccount;
      const dialogRef = this.dialog.open(CreateAccountComponent, {data: {hospital: account.hospital.id}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: string) => { if (result) { this.loadUsers(); } });
    });
  }

}
