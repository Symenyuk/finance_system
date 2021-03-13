import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, InsuranceService, Insurance, IAgreement, ConfirmationComponent, Filter } from 'bfs-library';
import { InsuranceDialogComponent, AssignInsuranceAdminDialogComponent, CreateAgreementDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-agencies',
  templateUrl: './insurances.component.html',
  styleUrls: ['./insurances.component.scss']
})
export class InsurancesComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Insurance[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private dialog: MatDialog, private api: BFSApiService, private insuranceService: InsuranceService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['name', 'contact', 'zip', 'address', 'contacts', 'admin'];
    BFSApiService.havePermission('change_admin_insurance').then(() => this.dataColumns.push('reassign'));
    BFSApiService.havePermission('edit_insurance').then(() => this.dataColumns.push('edit'));
    BFSApiService.havePermission('create_agreement').then(() => this.dataColumns.push('agreement'));
    // BFSApiService.havePermission('delete_insurance').then(() => this.dataColumns.push('delete'));
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, name: ''});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.loadInsurances();
  }

  loadInsurances(): void {
    const params = this.filter.getSelectedFields();
    this.insuranceService.getInsurances(params).then((data: {total: number, list: Insurance[]}) => {
      this.data = data;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadInsurances();
  }

  createInsurance(): void {
    BFSApiService.havePermission('create_insurance').then(() => {
      const dialogRef = this.dialog.open(InsuranceDialogComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadInsurances(); }
      });
    });
  }

  editInsurance(id: number): void {
    BFSApiService.havePermission('edit_insurance').then(() => {
      const dialogRef = this.dialog.open(InsuranceDialogComponent, {data: {insurance: id}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadInsurances(); }
      });
    });
  }

  deleteInsurance(insurance: Insurance): void {
    BFSApiService.havePermission('delete_insurance').then(() => {
      const title = `Delete ${insurance.name}`;
      const content = `Are you sure you want to delete ${insurance.name}? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) { this.insuranceService.deleteInsurance(insurance.id).then(() => this.loadInsurances()); }
      });
    });
  }

  assignUser(insurance: Insurance): void {
    BFSApiService.havePermission('change_admin_insurance').then(() => {
      const dialogRef = this.dialog.open(AssignInsuranceAdminDialogComponent, {data: {insurance}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((user: string) => {
        if (user) { insurance.admin = user; }
      });
    });
  }

  createAgreement(id: number): void {
    BFSApiService.havePermission('create_agreement').then(() => {
      const dialogRef = this.dialog.open(CreateAgreementDialogComponent, {data: {insurance: id}, width: '600px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: IAgreement) => {
        if (result) {
          if (this.data.list.findIndex(insurance => insurance.id === result.insurance) === -1) {
            this.loadInsurances();
          }
        }
      });
    });
  }

}
