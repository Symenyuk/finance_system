import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BFSApiService, AccountService, AdminAccount, BillService, ChangeCredentialsComponent, INavLink } from 'bfs-library';

@Component({
  selector: 'app-authorized',
  templateUrl: './authorized.component.html',
  styleUrls: ['./authorized.component.scss']
})
export class AuthorizedComponent implements OnInit, OnDestroy {

  public appLoaded: boolean;
  private refresh: boolean;
  private subscription: any;
  public greeting: string;
  public navLinks: INavLink[];

  constructor(private router: Router, private dialog: MatDialog, private api: BFSApiService, private accountService: AccountService, private billService: BillService) {
    this.appLoaded = false;
    this.refresh = true;
    this.subscription = router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
        this.refresh = !router.navigated;
      }
    });
    this.navLinks = [
      { icon: 'dashboard', label: 'Dashboard', path: '/dashboard' },
      { icon: 'person', label: 'Users', path: '/users', action: 'get_users' },
      { icon: 'business', label: 'Hospitals', path: '/hospitals', action: 'get_all_hospitals' },
      { icon: 'payment', label: 'Insurances', path: '/insurances', action: 'get_all_insurances' },
      { icon: 'assignment', label: 'Invoices', path: '/invoices', action: 'get_invoices' }
    ];
  }

  ngOnInit(): void {
    if (this.refresh) {
      this.accountService.setAdminAccount().then((account: AdminAccount) => {
        this.greeting = account.greeting;
        this.appLoaded = true;
      });
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
            return this.accountService.setAdminAccount();
          })
          .then((data: AdminAccount) => {
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
