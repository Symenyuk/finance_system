import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, AccountService, Account, AdminAccount, HospitalAccount, InsuranceAccount, ConfirmationComponent, CreateAccountComponent, Filter, RoleType } from 'bfs-library';
import { EditAccountDialogComponent } from '../dialogs/dialogs';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public tabs: {
    label: string,
    filter: Filter,
    nameChanged: Subject<string>,
    pageIndex: number,
    data: {total: number, list: AdminAccount[] | HospitalAccount[] | InsuranceAccount[]},
    dataColumns: string[],
    loaded: boolean
    getData: () => void
  }[];
  private selectedTab: number;
  public nameChanged: Subject<string> = new Subject<string>();
  public pageSize: number[];

  constructor(private dialog: MatDialog, private api: BFSApiService, private accountService: AccountService) {
    this.tabs = [
      {
        label: 'BFS Users',
        filter: new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, order_by: 'users.name ASC', name: ''}),
        nameChanged: new Subject<string>(),
        pageIndex: 0,
        data: {total: 0, list: []},
        dataColumns: ['status', 'name', 'login', 'role'],
        loaded: false,
        getData() {
          accountService.getBFSAccounts(this.filter.getSelectedFields()).then((accounts: {total: number, list: AdminAccount[]}) => {
            this.data = accounts;
            this.loaded = true;
          });
        }
      },
      {
        label: 'Hospital Users',
        filter: new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, order_by: 'users.name ASC', hospital: ''}),
        nameChanged: new Subject<string>(),
        pageIndex: 0,
        data: {total: 0, list: []},
        dataColumns: ['status', 'name', 'login', 'role', 'hospital'],
        loaded: false,
        getData() {
          accountService.getHospitalAccounts(this.filter.getSelectedFields()).then((accounts: {total: number, list: HospitalAccount[]}) => {
            this.data = accounts;
            this.loaded = true;
          });
        }
      },
      {
        label: 'Insurance Users',
        filter: new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, order_by: 'users.name ASC', insurance: ''}),
        nameChanged: new Subject<string>(),
        pageIndex: 0,
        data: {total: 0, list: []},
        dataColumns: ['status', 'name', 'login', 'role', 'insurance'],
        loaded: false,
        getData() {
          accountService.getInsuranceAccounts(this.filter.getSelectedFields()).then((accounts: {total: number, list: InsuranceAccount[]}) => {
            this.data = accounts;
            this.loaded = true;
          });
        }
      }
    ];
    this.selectedTab = 0;
    BFSApiService.havePermission('change_user_status').then(() => {
      this.tabs.forEach((tab: any) => tab.dataColumns.push('changeStatus'));
    });
    BFSApiService.havePermission('change_user_data').then(() => {
      const account = this.accountService.getAccount();
      if (account.role === RoleType.ADMINISTRATOR) {
        this.tabs.forEach((tab: any) => tab.dataColumns.push('edit'));
      }
    });
    BFSApiService.havePermission('delete_user').then(() => {
      this.tabs.forEach((tab: any) => tab.dataColumns.push('delete'));
    });
    this.tabs.forEach((tab: any) => {
      tab.nameChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => tab.getData());
    });
    this.pageSize = BFSConfigService.settings.pageSize.options;
  }

  ngOnInit(): void {
    this.loadAccounts(this.selectedTab);
  }

  loadAccounts(index: number): void {
    this.tabs[index].getData();
  }

  onTabChanged($event): void {
    this.selectedTab = $event.index;
    this.loadAccounts($event.index);
  }

  sortData($event): void {
    if ($event.direction) {
      this.tabs[this.selectedTab].filter.fields = {order_by: `users.${$event.active} ${$event.direction.toUpperCase()}`};
      this.loadAccounts(this.selectedTab);
    }
  }

  handlePage(event): void {
    this.tabs[this.selectedTab].filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.tabs[this.selectedTab].pageIndex = event.pageIndex;
    this.loadAccounts(this.selectedTab);
  }

  createAccount(): void {
    BFSApiService.havePermission('register').then(() => {
      const dialogRef = this.dialog.open(CreateAccountComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: string) => { if (result) { this.loadAccounts(this.selectedTab); } });
    });
  }

  changeStatus(account: Account, status: string): void {
    BFSApiService.havePermission('change_user_status').then(() => {
      this.api.patchData(`change_user_status/${account.id}`, {status}, () => account.status = status);
    });
  }

  editAccount(account: Account): void {
    BFSApiService.havePermission('change_user_data').then(() => {
      const dialogRef = this.dialog.open(EditAccountDialogComponent, {data: {account}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadAccounts(this.selectedTab); } });
    });
  }

  deleteAccount(account: Account): void {
    BFSApiService.havePermission('delete_user').then(() => {
      const title = `Delete ${account.name}`;
      const content = `Are you sure you want to delete ${account.name}? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.api.deleteData(`delete_user/${account.id}`, {}, () => this.loadAccounts(this.selectedTab));
        }
      });
    });
  }

}
