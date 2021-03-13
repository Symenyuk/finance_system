import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../services/bfs-hospital.service';
import { IOption } from '../../models/general.model';

@Component({
  selector: 'lib-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss', '../components.scss']
})
export class SelectDepartmentComponent implements OnInit {

  public departmentForm: FormGroup;
  public options: {
    branch: IOption[],
    department: IOption[]
  };

  get form() { return this.departmentForm.controls; }

  constructor(private service: HospitalService) {
    this.departmentForm = new FormGroup({
      branch: new FormControl(null, Validators.required),
      department: new FormControl({value: null, disabled: true}, Validators.required)
    });
    this.options = {branch: [], department: []};
  }

  ngOnInit(): void {
    this.service.getBranchOptions().then((options: IOption[]) => {
      this.options.branch = options;
      if (!this.options.branch.length) {
        this.form.branch.disable();
      }
    });
    this.form.branch.valueChanges.subscribe((value: number) => {
      if (value) {
        this.service.getDepartmentOptions(value).then((options: IOption[]) => {
          this.options.department = options;
          if (!this.options.department.length) {
            this.form.department.disable();
          } else {
            this.form.department.enable();
          }
        });
      } else {
        this.form.department.disable();
      }
    });
  }

}
