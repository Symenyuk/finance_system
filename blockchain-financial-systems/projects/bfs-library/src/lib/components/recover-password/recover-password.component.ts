import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSApiService } from '../../services/bfs-api.service';

@Component({
  selector: 'lib-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss', '../components.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public recoverForm: FormGroup;
  public postError: string;

  get form() { return this.recoverForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<RecoverPasswordComponent>, private snack: MatSnackBar, private api: BFSApiService) {
    this.recoverForm = new FormGroup({
      login: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      code: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  ngOnInit() {
    if (this.data && this.data.hasOwnProperty('login')) {
      this.form.login.setValue(this.data.login);
    }
    if (this.data && this.data.hasOwnProperty('email')) {
      this.form.email.setValue(this.data.email);
    }
  }

  recover() {
    this.api
      .recoverPassword(this.recoverForm.value)
      .then(() => {
        const snackMessage = `Password successfully changed.`;
        const snackOptions = {
          duration: 5000,
          horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
          verticalPosition: 'bottom' as MatSnackBarVerticalPosition
        };
        this.ref.close(true);
        this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'success-snack'});
      }, (error: Error) => this.postError = error.message)
      .catch();
  }

}
