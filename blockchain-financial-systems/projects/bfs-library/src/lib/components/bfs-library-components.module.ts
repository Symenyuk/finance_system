import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SelectBranchComponent } from './select-branch/select-branch.component';
import { SelectDepartmentComponent } from './select-department/select-department.component';
import { ActivateAccountComponent } from './activate-account/activate-account.component';
import { ChangeCredentialsComponent } from './change-credentials/change-credentials.component';
import { AgreementDetailsComponent } from './agreement-details/agreement-details.component';
import { ExportInvoiceComponent } from './export-invoice/export-invoice.component';
import { BillHistoryComponent } from './bill-history/bill-history.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { BillMessageComponent } from './bill-message/bill-message.component';
import { BillsConfirmComponent } from './bills-confirm/bills-confirm.component';
import { DebounceSearchComponent } from './debounce-search/debounce-search.component';

import { CheckPermissionPipe } from '../pipes/check-permission.pipe';

@NgModule({
  declarations: [
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ConfirmationComponent,
    CreateAccountComponent,
    SelectBranchComponent,
    SelectDepartmentComponent,
    ActivateAccountComponent,
    ChangeCredentialsComponent,
    AgreementDetailsComponent,
    ExportInvoiceComponent,
    BillHistoryComponent,
    BillDetailsComponent,
    BillMessageComponent,
    BillsConfirmComponent,
    DebounceSearchComponent,
    CheckPermissionPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule,
    MatListModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  exports: [
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ConfirmationComponent,
    CreateAccountComponent,
    SelectBranchComponent,
    SelectDepartmentComponent,
    ActivateAccountComponent,
    ChangeCredentialsComponent,
    AgreementDetailsComponent,
    ExportInvoiceComponent,
    BillHistoryComponent,
    BillDetailsComponent,
    BillMessageComponent,
    BillsConfirmComponent,
    DebounceSearchComponent,
    CheckPermissionPipe
  ],
  entryComponents: [
    ForgotPasswordComponent,
    RecoverPasswordComponent,
    ConfirmationComponent,
    CreateAccountComponent,
    SelectBranchComponent,
    SelectDepartmentComponent,
    ActivateAccountComponent,
    ChangeCredentialsComponent,
    AgreementDetailsComponent,
    ExportInvoiceComponent,
    BillHistoryComponent,
    BillDetailsComponent,
    BillMessageComponent,
    BillsConfirmComponent,
    DebounceSearchComponent
  ]
})
export class BFSLibraryComponentsModule {}
