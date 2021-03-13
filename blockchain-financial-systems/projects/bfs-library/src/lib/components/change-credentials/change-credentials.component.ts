import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { AccountService } from '../../services/bfs-account.service';

@Component({
  selector: 'lib-change-credentials',
  templateUrl: './change-credentials.component.html',
  styleUrls: ['./change-credentials.component.scss', '../components.scss']
})
export class ChangeCredentialsComponent {

  public credentialsForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.credentialsForm.controls; }

  constructor(private ref: MatDialogRef<ChangeCredentialsComponent>, private service: AccountService) {
    const account = this.service.getAccount();
    this.credentialsForm = new FormGroup({
      name: new FormControl(account.name, Validators.required),
      login: new FormControl(account.login, [Validators.required, Validators.minLength(5)]),
      email: new FormControl(account.email, [Validators.required, Validators.email]),
      mobile: new FormControl(account.mobile),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      change_password: new FormControl(false),
      new_password: new FormArray([])
    });
  }

  changePassword(): void {
    const newPass = this.form.new_password as FormArray;
    if (this.form.change_password.value) {
      newPass.push(
        new FormGroup({
          password: new FormControl('', [Validators.required, Validators.minLength(8)]),
          confirmation: new FormControl('', [Validators.required, Validators.minLength(8)])
        }, (group: FormGroup) => {
          if (group.controls.password.value !== group.controls.confirmation.value) {
            return {
              notEqual: 'New password and confirmation are not equal'
            };
          } else {
            return null;
          }
        })
      );
    } else {
      newPass.clear();
    }
  }

  save(): void {
    const {new_password, ...sendData} = this.credentialsForm.value;
    if (new_password.length) {
      sendData.new_password = new_password[0].password;
    }
    this.service
      .putAccount(sendData)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}
