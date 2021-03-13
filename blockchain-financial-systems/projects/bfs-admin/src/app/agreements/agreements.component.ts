import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BFSConfigService, BFSApiService, AccountService, AgreementService, Agreement, AgreementDetailsComponent, IOption, Filter, RoleType } from 'bfs-library';
import { CreateAgreementDialogComponent, EditAgreementDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-agreements',
  templateUrl: './agreements.component.html',
  styleUrls: ['./agreements.component.scss']
})
export class AgreementsComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Agreement[]};
  public dataColumns: string[];
  public options: {
    hospital: IOption[],
    insurance: IOption[],
    manager?: IOption[]
  };
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public managerCondition: boolean;

  constructor(private dialog: MatDialog, private snack: MatSnackBar, private api: BFSApiService, private accountService: AccountService, private agreementService: AgreementService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['hospital', 'insurance', 'manager', 'date', 'payment', 'penalty', 'info'];
    BFSApiService.havePermission('edit_agreement').then(() => this.dataColumns.push('edit'));
    // BFSApiService.havePermission('change_agreement_owner').then(() => this.dataColumns.push('transfer'));
    BFSApiService.havePermission('renew_agreement').then(() => this.dataColumns.push('renew'));
    this.options = {hospital: [], insurance: []};
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, hospital: 'All', insurance: 'All'}, ['All', 'all']);
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.managerCondition = false;
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount();
    if (account.role === RoleType.ADMINISTRATOR) {
      this.managerCondition = true;
      this.agreementService.getManagerOptions().then((options: IOption[]) => {
        this.options.manager = options;
        this.options.manager.unshift({value: 'all', label: 'All'});
        this.filter.addFields({manager: 'all'});
      });
    }
    Promise
      .all([this.agreementService.getHospitalOptions(), this.agreementService.getInsuranceOptions()])
      .then((values: any[]) => {
        this.options.hospital = values[0];
        this.options.hospital.unshift({value: -1, label: 'All'});
        this.options.insurance = values[1];
        this.options.insurance.unshift({value: -1, label: 'All'});
        this.loadAgreements();
      });
  }

  loadAgreements(): void {
    const params = this.filter.getSelectedFields();
    this.agreementService.getAgreements(params).then((data: {total: number, list: Agreement[]}) => {
      this.data = data;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadAgreements();
  }

  createAgreement(): void {
    BFSApiService.havePermission('create_agreement').then(() => {
      const dialogRef = this.dialog.open(CreateAgreementDialogComponent, {width: '600px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadAgreements(); }
      });
    });
  }

  showDetails(agreement: number): void {
    this.dialog.open(AgreementDetailsComponent, {data: {agreement}, panelClass: 'relative', width: '500px', disableClose: true});
  }

  editAgreement(agreement: number): void {
    BFSApiService.havePermission('edit_agreement').then(() => {
      const dialogRef = this.dialog.open(EditAgreementDialogComponent, {data: {agreement}, width: '600px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadAgreements(); }
      });
    });
  }

  changeStatus(agreement: Agreement, status: 0 | 1): void {
    const snackMessage = status === 1 ? 'Agreement is activated' : 'Agreement is frozen';
    const snackOptions = {
      duration: 5000,
      horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
      verticalPosition: 'bottom' as MatSnackBarVerticalPosition
    };
    this.agreementService.patchStatus(agreement.id, status).then(() => {
      agreement.status = status;
      this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'success-snack'});
    });
  }

  transfer(agreement: Agreement): void {
    /*BFSApiService.havePermission('change_agreement_owner').then(() => {
      const dialogRef = this.dialog.open(AssignUserDialogComponent, {data: {name: agreement.name, owner: agreement.owner}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(owner => {
        if (owner) {
          this.api.patchData(`change_agreement_owner/${agreement.id}`, {owner}, () => agreement.owner = owner);
        }
      });
    });*/
  }

}
