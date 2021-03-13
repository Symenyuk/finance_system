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
import { AgreementsComponent } from './agreements/agreements.component';
import { BillsComponent } from './bills/bills.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { BillsTableComponent } from './bills-table/bills-table.component';
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
    AgreementsComponent,
    BillsComponent,
    NotificationsComponent,
    BillsTableComponent
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
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
