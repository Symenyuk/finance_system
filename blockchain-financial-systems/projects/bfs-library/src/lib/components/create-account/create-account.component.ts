import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BFSApiService } from '../../services/bfs-api.service';
import { RoleType } from '../../models/general.model';
import { SelectBranchComponent } from '../select-branch/select-branch.component';
import { SelectDepartmentComponent } from '../select-department/select-department.component';

@Component({
  selector: 'lib-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss', '../components.scss']
})
export class CreateAccountComponent {

  public title: string;
  public userForm: FormGroup;
  public roles: string[];
  public postErrors: Error[];

  get form() { return this.userForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<CreateAccountComponent>, private api: BFSApiService) {
    this.title = data && data.hasOwnProperty('name') ? `Create account for ${data.name}` : 'Create account';
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      login: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile: new FormControl(''),
      role: new FormControl('', Validators.required)
    });
    const permissions = BFSApiService.getPermissions();
    this.roles = permissions.canRegister as string[];
    if (data && data.hasOwnProperty('role')) {
      this.form.role.setValue(data.role);
      this.form.role.disable();
    }
  }

  create(): void {
    this.postErrors = [];
    if (this.userForm.valid) {
      const data = {...this.userForm.getRawValue()};
      if (this.data && this.data.hasOwnProperty('hospital')) {
        data.hospital = this.data.hospital;
      }
      if (this.data && this.data.hasOwnProperty('insurance')) {
        data.insurance = this.data.insurance;
      }
      if (data.role === RoleType.HOSPITAL_TELLER) {
        const dialog = this.dialog.open(SelectDepartmentComponent, {width: '400px', disableClose: true});
        dialog.afterClosed().subscribe((value: any) => {
          if (value && value.hasOwnProperty('branch') && value.hasOwnProperty('department')) {
            data.branch = value.branch;
            data.department = value.department;
            this.api.postData('register', data, () => this.ref.close(data.login), (errors: Error[]) => this.postErrors = errors);
          } else {
            this.postErrors = [new Error('Branch and department are important for creating teller')];
          }
        });
      } else if (data.role === RoleType.HOSPITAL_FINANCE) {
        const dialog = this.dialog.open(SelectBranchComponent, {width: '400px', disableClose: true});
        dialog.afterClosed().subscribe((value: any) => {
          if (value) {
            data.branch = value === -1 ? null : value;
            this.api.postData('register', data, () => this.ref.close(data.login), (errors: Error[]) => this.postErrors = errors);
          } else {
            this.postErrors = [new Error('Branch is important for creating finance')];
          }
        });
      } else {
        this.api.postData('register', data, () => this.ref.close(data.login), (errors: Error[]) => this.postErrors = errors);
      }
    }
  }

}
