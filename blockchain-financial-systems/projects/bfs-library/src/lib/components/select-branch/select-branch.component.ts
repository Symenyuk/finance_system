import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HospitalService } from '../../services/bfs-hospital.service';
import { IOption } from '../../models/general.model';

@Component({
  selector: 'lib-select-branch',
  templateUrl: './select-branch.component.html',
  styleUrls: ['./select-branch.component.scss', '../components.scss']
})
export class SelectBranchComponent implements OnInit {

  public branchForm: FormGroup;
  public options: IOption[];

  get form() { return this.branchForm.controls; }

  constructor(private service: HospitalService) {
    this.branchForm = new FormGroup({
      branch: new FormControl(-1, Validators.required)
    });
  }

  ngOnInit(): void {
    this.service.getBranchOptions().then((options: IOption[]) => {
      this.options = options;
      this.options.unshift({value: -1, label: 'All'});
    });
  }

}
