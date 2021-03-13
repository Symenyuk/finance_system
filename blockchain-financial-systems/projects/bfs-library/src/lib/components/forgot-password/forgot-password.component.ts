import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSApiService } from '../../services/bfs-api.service';
import { RecoverPasswordComponent } from '../recover-password/recover-password.component';

@Component({
  selector: 'lib-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss', '../components.scss']
})
export class ForgotPasswordComponent implements OnInit {

  public forgotForm: FormGroup;
  public postError: string;

  get form() { return this.forgotForm.controls; }

  constructor(private dialog: MatDialog, private ref: MatDialogRef<ForgotPasswordComponent>, private snack: MatSnackBar, private api: BFSApiService) {
    this.forgotForm = new FormGroup({
      login: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit() {}

  sendCode() {
    this.api
      .forgotPassword(this.form.login.value, this.form.email.value)
      .then(() => {
        const snackMessage = `Email sent to ${this.form.email.value}. Please, check the recovery code.`;
        const snackOptions = {
          duration: 5000,
          horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
          verticalPosition: 'bottom' as MatSnackBarVerticalPosition
        };
        const data = {login: this.form.login.value, email: this.form.email.value};
        const dialog = this.dialog.open(RecoverPasswordComponent, {data, width: '400px', disableClose: true});
        this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'success-snack'});
        dialog.afterClosed().subscribe((value: boolean) => {
          if (value) {
            this.ref.close();
          }
        });
      })
      .catch((error: Error) => this.postError = error.message);
  }

}
