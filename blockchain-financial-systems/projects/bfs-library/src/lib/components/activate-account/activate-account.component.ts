import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSApiService } from '../../services/bfs-api.service';

@Component({
  selector: 'lib-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss', '../components.scss']
})
export class ActivateAccountComponent {

  public activationForm: FormGroup;
  public activationErrors: Error[];

  get form() { return this.activationForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<ActivateAccountComponent>, private api: BFSApiService, private snack: MatSnackBar) {
    if (data && data.hasOwnProperty('username') && data.hasOwnProperty('password')) {
      this.activationForm = new FormGroup({
        code: new FormControl('', Validators.required)
      });
    } else {
      const snackMessage = `Wrong activation data: missing username or password`;
      const snackOptions = {
        duration: 5000,
        horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
        verticalPosition: 'bottom' as MatSnackBarVerticalPosition
      };
      ref.close(false);
      this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'error-snack'});
    }
  }

  activate(): void {
    this.api
      .activate(this.data.username, this.data.password, this.form.code.value)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.activationErrors = errors);
  }

}
