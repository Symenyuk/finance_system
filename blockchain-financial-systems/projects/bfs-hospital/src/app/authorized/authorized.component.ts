import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BFSApiService, AccountService, HospitalAccount, HospitalService, Hospital, ChangeCredentialsComponent, INavLink } from 'bfs-library';

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

  constructor(private router: Router, private dialog: MatDialog, private api: BFSApiService, private accountService: AccountService, private hospitalService: HospitalService) {
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
      { icon: 'domain', label: 'Branches', path: '/branches', action: 'get_all_branches' },
      { icon: 'local_hospital', label: 'Services', path: '/services', action: 'get_services' },
      { icon: 'assignment', label: 'Agreements', path: '/agreements', action: 'get_all_agreements' },
      { icon: 'assignment', label: 'Invoices', path: '/invoices', action: 'get_invoices' },
      { icon: 'account_balance_wallet', label: 'Bills', path: '/bills', action: 'get_bills' },
      { icon: 'account_balance_wallet', label: 'Bills Statistics', path: '/bills-statistics', action: 'bills_statistics' }
    ];
  }

  ngOnInit(): void {
    if (this.refresh) {
      this.accountService
        .setHospitalAccount()
        .then((account: HospitalAccount) => {
          this.greeting = account.greeting;
          return this.hospitalService.getHospital(account.hospital.id);
        })
        .then((hospital: Hospital) => this.title = document.title = hospital.name)
        .then(() => this.appLoaded = true);
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
            return this.accountService.setHospitalAccount();
          })
          .then((data: HospitalAccount) => {
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
