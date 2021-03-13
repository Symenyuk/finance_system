import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BFSApiService, AccountService, HospitalAccount, ActivateAccountComponent, ForgotPasswordComponent } from 'bfs-library';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm: FormGroup;
  public postError: string;

  get form() { return this.loginForm.controls; }

  constructor(private dialog: MatDialog, private api: BFSApiService, private router: Router, private accountService: AccountService) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  logIn(): void {
    this.api
      .logIn(this.form.username.value, this.form.password.value)
      .then(() => {
        this.accountService.setHospitalAccount().then((account: HospitalAccount) => {
          this.router.navigateByUrl('dashboard').then();
        });
      })
      .catch((error: Error) => {
        switch (error.message) {
          case 'activate_account': this.activate(); break;
          case 'user_blocked': this.postError = 'Your account has been blocked! Please, contact blockchain administrator to unblock it.'; break; // TODO some logic
          case 'no_binding': this.postError = 'There are no hospitals associated with this account.'; break; // TODO some logic
          case 'indefinite_status': this.postError = 'You have indefinite status.'; break; // TODO some logic
          default: this.postError = error.message;
        }
      });
  }

  activate(): void {
    const dialogRef = this.dialog.open(ActivateAccountComponent, {data: this.loginForm.value, width: '300px', disableClose: true});
    dialogRef.afterClosed().subscribe(result => { if (result) { this.router.navigateByUrl('dashboard').then(); } });
  }

  forgotPassword(): void {
    this.dialog.open(ForgotPasswordComponent, {width: '400px', disableClose: true});
  }

}
