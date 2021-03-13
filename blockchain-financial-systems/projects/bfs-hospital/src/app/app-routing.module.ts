import { NgModule, Injectable } from '@angular/core';
import { Routes, Router, ActivatedRouteSnapshot, RouterModule, CanActivate } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AuthorizedComponent } from './authorized/authorized.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { BranchesComponent } from './branches/branches.component';
import { DepartmentsComponent } from './departments/departments.component';
import { ServicesComponent } from './services/services.component';
import { AgreementsComponent } from './agreements/agreements.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { BillsComponent } from './bills/bills.component';
import { BillsStatisticsComponent } from './bills-statistics/bills-statistics.component';

import { BFSApiService } from 'bfs-library';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(): boolean {
    if (!BFSApiService.isLoggedIn()) {
      this.router.navigateByUrl('login').then(() => {
        return false;
      });
    }
    return true;
  }
}

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(public router: Router) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    const action = route.data.action;
    const permissions = BFSApiService.getPermissions();
    if (permissions.hasOwnProperty(action) && permissions[action]) {
      return true;
    } else {
      this.router.navigateByUrl('unauthorized').then(() => {
        return false;
      });
    }
  }
}

const routes: Routes = [
  {
    path: '',
    component: AuthorizedComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_users' }
      },
      {
        path: 'branches',
        component: BranchesComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_all_branches' }
      },
      {
        path: 'branches/:id',
        component: DepartmentsComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_all_departments' }
      },
      {
        path: 'services',
        component: ServicesComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_services' }
      },
      {
        path: 'agreements',
        component: AgreementsComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_all_agreements' }
      },
      {
        path: 'invoices',
        component: InvoicesComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_invoices' }
      },
      {
        path: 'bills',
        component: BillsComponent,
        canActivate: [PermissionGuard],
        data: { action: 'get_bills' }
      },
      {
        path: 'bills-statistics',
        component: BillsStatisticsComponent,
        canActivate: [PermissionGuard],
        data: { action: 'bills_statistics' }
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },
  {
    path: '**',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, PermissionGuard]
})
export class AppRoutingModule {}
