import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BFSLocationService, AccountService, BillService, HospitalAccount, InsuranceAccount, IOption, RoleType } from 'bfs-library';
import { AgreementService, Agreement, HospitalService, Hospital, InsuranceService, Insurance } from 'bfs-library';
import { CreateAccountComponent, ConfirmationComponent } from 'bfs-library';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-edit-account-dialog',
  templateUrl: 'edit-account-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class EditAccountDialogComponent {

  private accountId: number;
  private accountLogin: string;
  public accountForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.accountForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<HospitalDialogComponent>, private service: AccountService) {
    if (data && data.hasOwnProperty('account')) {
      this.accountId = data.account.id;
      this.accountLogin = data.account.login;
      this.accountForm = new FormGroup({
        name: new FormControl(data.account.name, Validators.required),
        login: new FormControl(data.account.login, [Validators.required, Validators.minLength(5)]),
        email: new FormControl(data.account.email, [Validators.required, Validators.email]),
        mobile: new FormControl(data.account.mobile)
      });
    } else {
      ref.close(false);
    }
  }

  edit(): void {
    const title = `Edit ${this.accountLogin}`;
    const content = `Please, confirm that you really want to edit ${this.accountLogin} account.`;
    const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content, confirmation: true}, width: '400px', disableClose: true});
    dialogRef.afterClosed().subscribe((result: boolean | string) => {
      if (result) {
        const body = {
          change_not_your_account: 1,
          user_id: this.accountId,
          user_login: this.accountLogin,
          password: result,
          ...this.accountForm.value
        };
        this.service
          .putAccount(body)
          .then(() => this.ref.close(true))
          .catch((errors: Error[]) => this.postErrors = errors);
      }
    });
  }

}

@Component({
  selector: 'app-hospital-dialog',
  templateUrl: 'hospital-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class HospitalDialogComponent implements OnInit {

  public hospital: number;
  public hospitalForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.hospitalForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<HospitalDialogComponent>, private service: HospitalService) {
    this.hospitalForm = new FormGroup({
      name: new FormControl('', Validators.required),
      name_unique: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z]+')]),
      contact_person_name: new FormControl(''),
      contact_person_email: new FormControl('', Validators.email),
      contact_person_phone: new FormControl(''),
      zip_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)])
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('hospital')) {
      this.hospital = this.data.hospital;
      this.service.getHospital(this.data.hospital).then((hospital: Hospital) => {
        this.form.name.setValue(hospital.name);
        this.form.name_unique.setValue(hospital.uniqueName);
        this.form.name_unique.disable();
        this.form.contact_person_name.setValue(hospital.contact.name);
        this.form.contact_person_email.setValue(hospital.contact.email);
        this.form.contact_person_phone.setValue(hospital.contact.phone);
        this.form.zip_code.setValue(hospital.zipCode);
      });
    }
  }

  create(): void {
    this.service
      .postHospital(this.hospitalForm.value)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

  update(): void {
    this.service
      .putHospital(this.hospital, this.hospitalForm.value)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}

@Component({
  selector: 'app-insurance-dialog',
  templateUrl: 'insurance-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class InsuranceDialogComponent implements OnInit {

  public insurance: number;
  public insuranceForm: FormGroup;
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

  get form() { return this.insuranceForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<InsuranceDialogComponent>, private location: BFSLocationService, private service: InsuranceService) {
    this.insuranceForm = new FormGroup({
      name: new FormControl('', Validators.required),
      contact: new FormControl('', Validators.required),
      zip_code: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      region: new FormControl('', Validators.required),
      city: new FormControl({value: '', disabled: true}, Validators.required),
      district: new FormControl({value: '', disabled: true}),
      street: new FormControl('', Validators.required),
      building: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      tel: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      extension: new FormControl('')
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
    if (this.data && this.data.hasOwnProperty('insurance')) {
      this.insurance = this.data.insurance;
      const address = {region: '', city: '', district: ''};
      this.service
        .getInsurance(this.data.insurance)
        .then((insurance: Insurance) => {
          this.form.name.setValue(insurance.name);
          this.form.contact.setValue(insurance.contactPerson);
          this.form.zip_code.setValue(insurance.zipCode);
          address.region = insurance.address.region;
          address.city = insurance.address.city;
          address.district = insurance.address.district;
          this.form.street.setValue(insurance.address.street);
          this.form.building.setValue(insurance.address.building);
          this.form.email.setValue(insurance.email);
          this.form.tel.setValue(insurance.telephone);
          this.form.mobile.setValue(insurance.mobile);
          this.form.extension.setValue(insurance.extension);
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

  submitRegion(value: string, original: any): void {
    this.regionSubmitted = true;
    this.selectedRegion = original.region_id;
    this.location.getCities('', this.selectedRegion).then((cities: IOption[]) => {
      if (cities.length) {
        this.form.city.enable();
        this.options.city = cities;
      }
    });
  }

  submitCity(value: string, original: any): void {
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
    this.service
      .postInsurance(this.insuranceForm.value)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

  update(): void {
    this.service
      .putInsurance(this.insurance, this.insuranceForm.value)
      .then(() => this.ref.close(true))
      .catch((errors: Error[]) => this.postErrors = errors);
  }

}

@Component({
  selector: 'app-assign-account-dialog',
  templateUrl: 'assign-account-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class AssignHospitalAdminDialogComponent implements OnInit {

  public accounts: HospitalAccount[];
  public name: string;
  public account: string;
  public hint: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<AssignHospitalAdminDialogComponent>, private snack: MatSnackBar, private accountService: AccountService, private hospitalService: HospitalService) {
    this.accounts = [];
    if (data && data.hasOwnProperty('hospital')) {
      this.name = data.hospital.name;
      this.account = data.hospital.admin;
    } else {
      ref.close('');
    }
    this.hint = '';
  }

  ngOnInit(): void {
    this.accountService.getHospitalAccounts({role: RoleType.HOSPITAL_ADMINISTRATOR}).then((accounts: {total: number, list: HospitalAccount[]}) => {
      this.accounts = accounts.list.filter((account: HospitalAccount) => account.hospital.id === null || account.login === this.account);
      if (!this.accounts.length) {
        this.hint = 'There are no available accounts. Create new account instead';
      }
    });
  }

  assignAccount(): void {
    const snackOptions = {
      duration: 5000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition
    };
    this.hospitalService
      .patchAdmin(this.data.hospital.id, this.account)
      .then(() => {
        this.ref.close(this.account);
        this.snack.open(`${this.account} assigned for ${this.name}`, 'Hide', {...snackOptions, panelClass: 'success-snack'});
      })
      .catch((errors: Error[]) => {
        this.ref.close('');
        this.snack.open(errors[0].message, 'Hide', {...snackOptions, panelClass: 'error-snack'});
      });
  }

  createAccount(): void {
    const data = {name: this.data.hospital.name, role: RoleType.HOSPITAL_ADMINISTRATOR, hospital: this.data.hospital.id};
    const dialogRef = this.dialog.open(CreateAccountComponent, {data, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe((login: string) => {
      if (login) { this.ref.close(login); }
    });
  }

}

@Component({
  selector: 'app-assign-account-dialog',
  templateUrl: 'assign-account-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class AssignInsuranceAdminDialogComponent implements OnInit {

  public accounts: InsuranceAccount[];
  public name: string;
  public account: string;
  public hint: string;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<AssignInsuranceAdminDialogComponent>, private snack: MatSnackBar, private accountService: AccountService, private insuranceService: InsuranceService) {
    this.accounts = [];
    if (data && data.hasOwnProperty('insurance')) {
      this.name = data.insurance.name;
      this.account = data.insurance.admin;
    } else {
      ref.close('');
    }
    this.hint = '';
  }

  ngOnInit(): void {
    this.accountService.getInsuranceAccounts({role: RoleType.INSURANCE_ADMINISTRATOR}).then((accounts: {total: number, list: InsuranceAccount[]}) => {
      this.accounts = accounts.list.filter((account: InsuranceAccount) => account.insurance.id === null || account.login === this.account);
      if (!this.accounts.length) {
        this.hint = 'There are no available accounts. Create new account instead';
      }
    });
  }

  assignAccount(): void {
    const snackOptions = {
      duration: 5000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition
    };
    this.insuranceService
      .patchAdmin(this.data.insurance.id, this.account)
      .then(() => {
        this.ref.close(this.account);
        this.snack.open(`${this.account} assigned for ${this.name}`, 'Hide', {...snackOptions, panelClass: 'success-snack'});
      })
      .catch((errors: Error[]) => {
        this.ref.close('');
        this.snack.open(errors[0].message, 'Hide', {...snackOptions, panelClass: 'error-snack'});
      });
  }

  createAccount(): void {
    const data = {name: this.data.insurance.name, role: RoleType.INSURANCE_ADMINISTRATOR, insurance: this.data.insurance.id};
    const dialogRef = this.dialog.open(CreateAccountComponent, {data, width: '500px', disableClose: true});
    dialogRef.afterClosed().subscribe((login: string) => {
      if (login) { this.ref.close(login); }
    });
  }

}

@Component({
  selector: 'app-create-agreement-dialog',
  templateUrl: 'create-agreement-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class CreateAgreementDialogComponent implements OnInit {

  public agreementForm: FormGroup;
  public postErrors: Error[];
  public hospitals: IOption[];
  public insurances: IOption[];

  get form() { return this.agreementForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<CreateAgreementDialogComponent>, private service: AgreementService) {
    this.agreementForm = new FormGroup({
      hospital: new FormControl('', Validators.required),
      insurance: new FormControl('', Validators.required),
      transaction_interval: new FormControl('', Validators.required),
      review_interval: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      payment_interval: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      charges: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      transaction_charges_per_bill: new FormControl('', [Validators.required, Validators.min(0.01)]),
      delay_penalty: new FormControl(1, Validators.min(0.01)),
      discount_rate: new FormControl('', [Validators.min(1), Validators.pattern(/^-?[0-9]+$/)])
    });
    if (data && data.hasOwnProperty('hospital')) {
      this.form.hospital.setValue(data.hospital);
      this.form.hospital.disable();
    }
    if (data && data.hasOwnProperty('insurance')) {
      this.form.insurance.setValue(data.insurance);
      this.form.insurance.disable();
    }
  }

  ngOnInit(): void {
    this.service.getHospitalOptions().then((data: IOption[]) => this.hospitals = data);
    this.service.getInsuranceOptions().then((data: IOption[]) => this.insurances = data);
  }

  createAgreement(): void {
    if (this.agreementForm.valid) {
      const agreement = this.agreementForm.getRawValue();
      this.service
        .postAgreement(agreement)
        .then(() => this.ref.close(agreement))
        .catch((errors: Error[]) => this.postErrors = errors);
    }
  }

}

@Component({
  selector: 'app-edit-agreement-dialog',
  templateUrl: 'edit-agreement-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class EditAgreementDialogComponent implements OnInit {

  public agreementForm: FormGroup;
  public postErrors: Error[];

  get form() { return this.agreementForm.controls; }

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<EditAgreementDialogComponent>, private service: AgreementService) {
    this.agreementForm = new FormGroup({
      transaction_interval: new FormControl('', Validators.required),
      review_interval: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      payment_interval: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      charges: new FormControl('', [Validators.required, Validators.min(1), Validators.pattern(/^-?[0-9]+$/)]),
      transaction_charges_per_bill: new FormControl('', [Validators.required, Validators.min(0.01)]),
      delay_penalty: new FormControl('', Validators.min(0.01)),
      discount_rate: new FormControl('', [Validators.min(1), Validators.pattern(/^-?[0-9]+$/)])
    });
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('agreement')) {
      this.service.getAgreement(this.data.agreement).then((agreement: Agreement) => {
        this.form.transaction_interval.setValue(agreement.transactionInterval);
        this.form.review_interval.setValue(agreement.reviewInterval);
        this.form.payment_interval.setValue(agreement.paymentInterval);
        this.form.charges.setValue(agreement.charges);
        this.form.transaction_charges_per_bill.setValue(agreement.transactionChargesPerBill);
        this.form.delay_penalty.setValue(agreement.delayPenalty);
        this.form.discount_rate.setValue(agreement.discountRate);
      });
    }
  }

  editAgreement(): void {
    if (this.agreementForm.valid) {
      const agreement = this.agreementForm.getRawValue();
      this.service
        .putAgreement(this.data.agreement, agreement)
        .then(() => this.ref.close(agreement))
        .catch((errors: Error[]) => this.postErrors = errors);
    }
  }

}

@Component({
  selector: 'app-export-bills-dialog',
  templateUrl: 'export-bills-dialog.html',
  styleUrls: ['dialogs.scss']
})
export class ExportBillsDialogComponent implements OnInit {

  private pdf: Blob;
  public finished: boolean;
  public postErrors: Error[];

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<ExportBillsDialogComponent>, private service: BillService) {
    this.pdf = null;
    this.finished = false;
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('params')) {
      this.service
        .exportBills(this.data.params)
        .then((data: any) => this.pdf = data)
        .catch((errors: Error[]) => this.postErrors = errors)
        .finally(() => this.finished = true);
    }
  }

  open(): void {
    const url = URL.createObjectURL(this.pdf);
    window.open(url);
  }

  download(): void {
    saveAs(this.pdf, `report-${new Date().toISOString().split('T')[0]}`);
  }

}
