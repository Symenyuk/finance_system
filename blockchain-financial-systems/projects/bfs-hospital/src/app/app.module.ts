import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { CustomMaterialModule } from './custom-material.module';
import { AppComponent } from './app.component';
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
import { BillsTableComponent } from './bills-table/bills-table.component';
import { BillsStatisticsComponent } from './bills-statistics/bills-statistics.component';
import * as Dialogs from './dialogs/dialogs';

import { BFSLibraryModule } from 'bfs-library';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UnauthorizedComponent,
    AuthorizedComponent,
    DashboardComponent,
    UsersComponent,
    BranchesComponent,
    DepartmentsComponent,
    ServicesComponent,
    AgreementsComponent,
    InvoicesComponent,
    BillsComponent,
    BillsTableComponent,
    BillsStatisticsComponent,
    Dialogs.CreateBillDialogComponent,
    Dialogs.BranchDialogComponent,
    Dialogs.DepartmentDialogComponent,
    Dialogs.ServiceDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    CustomMaterialModule,
    BFSLibraryModule.forRoot(`assets/config/config.${environment.name}.json`)
  ],
  providers: [],
  entryComponents: [
    Dialogs.CreateBillDialogComponent,
    Dialogs.BranchDialogComponent,
    Dialogs.DepartmentDialogComponent,
    Dialogs.ServiceDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
