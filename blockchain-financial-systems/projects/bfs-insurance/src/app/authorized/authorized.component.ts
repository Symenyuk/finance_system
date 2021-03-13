import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BFSApiService, AccountService, InsuranceAccount, InsuranceService, Insurance, BillService, ChangeCredentialsComponent, INavLink } from 'bfs-library';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit, OnDestroy {

  public appLoaded: boolean;
  private refresh: boolean;
  private subscription: any;
  public title: string;
  public greeting: string;
  public navLinks: INavLink[];

  constructor(private router: Router, private dialog: MatDialog, private api: BFSApiService, private accountService: AccountService, private insuranceService: InsuranceService, private billService: BillService) {
    this.appLoaded = false;
    this.refresh = true;
    this.subscription = router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.refresh = !router.navigated;
      }
    });
    this.navLinks = [
      { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { icon: 'person', label: 'Accounts', path: '/users', action: 'get_users' },
      { icon: 'assignment', label: 'Agreements', path: '/agreements', action: 'get_all_agreements' },
      { icon: 'account_balance_wallet', label: 'Bills', path: '/bills', action: 'get_bills' }
    ];
  }

  ngOnInit(): void {
    if (this.refresh) {
      this.accountService
        .setInsuranceAccount()
        .then((account: InsuranceAccount) => {
          this.greeting = account.greeting;
          return this.insuranceService.getInsurance(account.insurance.id);
        })
        .then((insurance: Insurance) => this.title = document.title = insurance.name)
        .then(() => this.appLoaded = true);
      this.billService.checkNotificationsBadge();
    } else {
      const account = this.accountService.getAccount();
      this.greeting = account.greeting;
    }
  }

  changeCredentials(): void {
    const dialogRef = this.dialog.open(ChangeCredentialsComponent, {width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.api
          .refreshToken()
          .then(() => {
            return this.accountService.setInsuranceAccount();
          })
          .then((data: InsuranceAccount) => {
            this.greeting = data.greeting;
          })
          .catch(err => {
            console.warn(err);
            this.logout();
          });
      }
    });
  }

  logout(): void {
    this.api.logOut().then(() => this.router.navigateByUrl('login').then());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
