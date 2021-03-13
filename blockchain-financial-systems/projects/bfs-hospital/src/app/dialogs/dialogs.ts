import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BFSLocationService, AccountService, HospitalAccount, HospitalService, Branch, Department, Service, BillService, IOption } from 'bfs-library';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'app-create-bill-dialog',
  templateUrl: 'create-bill-dialog.html',
  styleUrls: ['dialogs.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CreateBillDialogComponent implements OnInit {

  public processing: boolean;
  public setUpBillForm: FormGroup;
  public options: {
    insurance: IOption[],
    branch: IOption[],
    department: IOption[],
    service: IOption[],
    bill: IOption[]
  };
  public postErrors: Error[];

  get form() { return this.setUpBillForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<CreateBillDialogComponent>, private accountService: AccountService, private hospitalService: HospitalService, private billService: BillService) {
    this.processing = false;
    const date = new Date();
    const formattedDate = `${date.getFullYear()}-${((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1)}-${(date.getDate() < 10 ? '0' : '') + date.getDate()}`;
    const formattedTime = `${(date.getHours() < 10 ? '0' : '') + date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
    this.setUpBillForm = new FormGroup({
      insurance: new FormControl(null, Validators.required),
      national_security_number: new FormControl(null, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      patient_name: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      patient_mobile: new FormControl({value: '', disabled: false}, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      patient_age: new FormControl({value: null, disabled: false}, [Validators.required, Validators.min(0), Validators.pattern(/^-?[0-9]+$/)]),
      policy_number: new FormControl({value: '', disabled: false}, Validators.required),
      policy_type: new FormControl({value: '', disabled: false}),
      approval_number: new FormControl('', [Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      insurance_approval: new FormControl(''),
      approval_date: new FormControl(formattedDate),
      approval_time: new FormControl(formattedTime),
      branch: new FormControl('', Validators.required),
      department: new FormControl('', Validators.required),
      doctor_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]),
      service_name: new FormControl('', Validators.required),
      service_description: new FormControl(''),
      related_bill: new FormControl(''),
      cost: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      discount: new FormControl(null, Validators.min(0)),
      vat: new FormControl(null, Validators.min(0)),
      paid_by_patient: new FormControl(null, [Validators.required, Validators.min(0.01)]),
      remain_to_pay_by_insurance: new FormControl(null, Validators.min(0.01)),
      additional_info: new FormControl('')
    });
    this.options = {insurance: [], branch: [], department: [], service: [], bill: []};
    if (data && data.hasOwnProperty('insurance')) {
      this.form.insurance.setValue(data.insurance);
      this.form.insurance.disable();
    }
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount() as HospitalAccount;
    this.hospitalService.getInsuranceOptions().then((data: IOption[]) => {
      this.options.insurance = data;
      if (!this.options.insurance.length) {
        this.form.insurance.disable();
      }
    });
    this.form.national_security_number.valueChanges.subscribe((value: string) => {
      if (value.length > 4) {
        this.billService.checkPatient({national_security_number: value}).then((data: any) => {
          if (data) {
            this.form.patient_name.setValue(data.patient_name);
            this.form.patient_mobile.setValue(data.patient_mobile);
            this.form.patient_age.setValue(data.patient_age);
            this.form.policy_number.setValue(data.policy_number);
            this.form.policy_type.setValue(data.policy_type);
            this.billService.getRelatedBills({national_security_number: value}).then((bills: IOption[]) => {
              this.options.bill = bills;
            });
          }
        });
      }
    });
    this.hospitalService.getBranchOptions().then((data: IOption[]) => {
      this.options.branch = data;
      // this.form.branch.setValue(account.branch);
      if (!this.options.branch.length) {
        this.form.branch.disable();
        this.form.department.disable();
      }
    });
    this.form.branch.valueChanges.subscribe((value: number) => {
      this.hospitalService.getDepartmentOptions(value).then((data: IOption[]) => {
        this.options.department = data;
        // this.form.department.setValue(account.department);
        if (!this.options.department.length) {
          this.form.department.disable();
        } else {
          this.form.department.enable();
        }
      });
    });
    this.hospitalService.getServiceOptions().then((data: IOption[]) => {
      this.options.service = data;
      if (!this.options.service.length) {
        this.form.service.disable();
      }
    });
  }
  changeBranch() {
    this.options.department = [];
  }


  setUpBill(): void {
    this.processing = true;
    this.billService
      .postBill(this.setUpBillForm.getRawValue())
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => {
        this.postErrors = errors;
        this.processing = false;
      });
  }

}

@Component({
  selector: 'app-branch-dialog',
  templateUrl: 'branch-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class BranchDialogComponent implements OnInit {

  public editing: boolean;
  public branchForm: FormGroup;
  public options: {
    region: IOption[],
    city: IOption[],
    district: IOption[]
  };
  public regionChanged: Subject<string> = new Subject<string>();
  public cityChanged: Subject<string> = new Subject<string>();
  public districtChanged: Subject<string> = new Subject<string>();
  public postErrors: Error[];
  public selectedRegion: number;
  private regionSubmitted: boolean;
  public selectedCity: number;
  private citySubmitted: boolean;
  public districtHint: string;

  get form() { return this.branchForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<BranchDialogComponent>, private location: BFSLocationService, private service: HospitalService) {
    this.editing = false;
    this.branchForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      region: new FormControl('', Validators.required),
      city: new FormControl({value: '', disabled: true}, Validators.required),
      district: new FormControl({value: '', disabled: true}),
      street: new FormControl(''),
      building: new FormControl(''),
      email: new FormControl('', Validators.email),
      tel: new FormControl(''),
      mobile: new FormControl(''),
      extension: new FormControl(''),
      manager_id: new FormControl('')
    });
    this.options = {region: [], city: [], district: []};
    this.selectedRegion = 0;
    this.selectedCity = 0;
    this.districtHint = '';
    this.regionChanged.pipe(debounceTime(0), distinctUntilChanged()).subscribe((search: string) => {
      this.location.getRegions(search).then((options: IOption[]) => {
        this.options.region = options;
        if (!this.selectedRegion) {
          this.form.city.setValue('');
          this.form.city.markAsPristine();
          this.form.district.setValue('');
        }
      });
    });
    this.cityChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      if (this.selectedRegion) {
        this.location.getCities(search, this.selectedRegion).then((options: IOption[]) => {
          this.options.city = options;
          if (!this.selectedCity) {
            this.form.district.setValue('');
          }
        });
      }
    });
    this.districtChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe((search: string) => {
      if (this.selectedRegion && this.selectedCity) {
        this.location.getDistricts(search, this.selectedRegion, this.selectedCity).then((options: IOption[]) => {
          this.options.district = options;
        });
      } else {
        this.form.district.disable();
        this.districtHint = '';
        this.options.district = [];
      }
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('branch')) {
      this.editing = true;
      const address = {region: '', city: '', district: ''};
      this.service
        .getBranch(this.data.branch)
        .then((branch: Branch) => {
          this.form.name.setValue(branch.name);
          this.form.description.setValue(branch.description);
          address.region = branch.address.region;
          address.city = branch.address.city;
          address.district = branch.address.district;
          this.form.street.setValue(branch.address.street);
          this.form.building.setValue(branch.address.building);
          this.form.email.setValue(branch.email);
          this.form.tel.setValue(branch.telephone);
          this.form.mobile.setValue(branch.mobile);
          this.form.extension.setValue(branch.extension);
          this.form.manager_id.setValue(branch.manager);
          return this.location.getRegions(address.region);
        })
        .then((regions: IOption[]) => {
          if (regions.length) {
            this.regionSubmitted = true;
            this.selectedRegion = regions[0].original.region_id;
            this.form.region.setValue(address.region);
          }
          return this.location.getCities(address.city, this.selectedRegion);
        })
        .then((cities: IOption[]) => {
          if (cities.length) {
            this.form.city.enable();
            this.citySubmitted = true;
            this.selectedCity = cities[0].original.city_id;
            this.form.city.setValue(address.city);
          }
          return this.location.getDistricts(address.district, this.selectedRegion, this.selectedCity);
        })
        .then((districts: IOption[]) => {
          if (districts.length) {
            this.form.district.enable();
            this.form.district.setValue(address.district);
          } else {
            this.districtHint = 'There are no districts for selected city.';
          }
        });
    }
    this.form.region.valueChanges.subscribe((value: string) => {
      if (!this.regionSubmitted) {
        this.selectedRegion = 0;
        this.regionChanged.next(value);
      } else {
        this.regionSubmitted = false;
      }
    });
    this.form.city.valueChanges.subscribe((value: string) => {
      if (!this.citySubmitted) {
        this.selectedCity = 0;
        this.cityChanged.next(value);
      } else {
        this.citySubmitted = false;
      }
    });
    this.form.district.valueChanges.subscribe((value: string) => {
      this.districtChanged.next(value);
    });
  }

  submitRegion(value: string, original: any) {
    this.regionSubmitted = true;
    this.selectedRegion = original.region_id;
    this.location.getCities('', this.selectedRegion).then((cities: IOption[]) => {
      if (cities.length) {
        this.form.city.enable();
        this.options.city = cities;
      }
    });
  }

  submitCity(value: string, original: any) {
    this.citySubmitted = true;
    this.selectedCity = original.city_id;
    this.location.getDistricts('', this.selectedRegion, this.selectedCity).then((districts: IOption[]) => {
      if (districts.length) {
        this.form.district.enable();
        this.districtHint = '';
        this.options.district = districts;
      } else {
        this.form.district.disable();
        this.districtHint = 'There are no districts for selected city.';
        this.options.district = [];
      }
    });
  }

  create(): void {
    const body = {
      ...this.branchForm.value,
      country: 'Saudi Arabia'
    };
    this.service
      .postBranch(body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

  edit(): void {
    const body = {
      ...this.branchForm.value,
      country: 'Saudi Arabia'
    };
    this.service
      .putBranch(this.data.branch, body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}

@Component({
  selector: 'app-department-dialog',
  templateUrl: 'department-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class DepartmentDialogComponent implements OnInit {

  public editing: boolean;
  public branch: string;
  public departmentForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.departmentForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<DepartmentDialogComponent>, private service: HospitalService) {
    this.editing = false;
    this.branch = this.data && this.data.hasOwnProperty('branch') ? data.branch.name : '';
    this.departmentForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('department') && this.data.hasOwnProperty('branch')) {
      this.editing = true;
      this.service.getDepartment(this.data.department, {branch: this.data.branch.id}).then((department: Department) => {
        this.form.name.setValue(department.name);
      });
    }
  }

  create(): void {
    const body = {
      branch: this.data.branch.id,
      ...this.departmentForm.value
    };
    this.service
      .postDepartment(body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

  edit(): void {
    const body = {...this.departmentForm.value};
    this.service
      .putDepartment(this.data.department, body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}

@Component({
  selector: 'app-service-dialog',
  templateUrl: 'service-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class ServiceDialogComponent implements OnInit {

  public editing: boolean;
  public serviceForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.serviceForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<ServiceDialogComponent>, private service: HospitalService) {
    this.editing = false;
    this.serviceForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('service')) {
      this.editing = true;
      this.service.getService(this.data.service).then((service: Service) => {
        this.form.name.setValue(service.name);
      });
    }
  }

  create(): void {
    const body = {...this.serviceForm.value};
    this.service
      .postService(body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

  edit(): void {
    const body = {...this.serviceForm.value};
    this.service
      .putService(this.data.service, body)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}
