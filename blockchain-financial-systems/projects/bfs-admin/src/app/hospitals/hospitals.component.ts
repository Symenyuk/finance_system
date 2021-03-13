import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, HospitalService, Hospital, IAgreement, ConfirmationComponent, Filter } from 'bfs-library';
import { HospitalDialogComponent, CreateAgreementDialogComponent, AssignHospitalAdminDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-providers',
  templateUrl: './hospitals.component.html',
  styleUrls: ['./hospitals.component.scss']
})
export class HospitalsComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Hospital[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private dialog: MatDialog, private api: BFSApiService, private hospitalService: HospitalService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['name', 'unique', 'contact', 'zip', 'admin'];
    BFSApiService.havePermission('change_admin_hospital').then(() => this.dataColumns.push('reassign'));
    BFSApiService.havePermission('edit_hospital').then(() => this.dataColumns.push('edit'));
    BFSApiService.havePermission('create_agreement').then(() => this.dataColumns.push('agreement'));
    // BFSApiService.havePermission('delete_hospital').then(() => this.dataColumns.push('delete'));
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, name: ''});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.loadHospitals();
  }

  loadHospitals(): void {
    const params = this.filter.getSelectedFields();
    this.hospitalService.getHospitals(params).then((data: {total: number, list: Hospital[]}) => {
      this.data = data;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadHospitals();
  }

  createHospital(): void {
    BFSApiService.havePermission('create_hospital').then(() => {
      const dialogRef = this.dialog.open(HospitalDialogComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadHospitals(); }
      });
    });
  }

  editHospital(id: number): void {
    BFSApiService.havePermission('edit_hospital').then(() => {
      const dialogRef = this.dialog.open(HospitalDialogComponent, {data: {hospital: id}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.loadHospitals(); }
      });
    });
  }

  deleteHospital(hospital: Hospital): void {
    BFSApiService.havePermission('delete_hospital').then(() => {
      const title = `Delete ${hospital.name}`;
      const content = `Are you sure you want to delete ${hospital.name}? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe(result => {
        if (result) { this.hospitalService.deleteHospital(hospital.id).then(() => this.loadHospitals()); }
      });
    });
  }

  assignUser(hospital: Hospital): void {
    BFSApiService.havePermission('change_admin_hospital').then(() => {
      const dialogRef = this.dialog.open(AssignHospitalAdminDialogComponent, {data: {hospital}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((user: string) => {
        if (user) { hospital.admin = user; }
      });
    });
  }

  createAgreement(id: number): void {
    BFSApiService.havePermission('create_agreement').then(() => {
      const dialogRef = this.dialog.open(CreateAgreementDialogComponent, {data: {hospital: id}, width: '600px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: IAgreement) => {
        if (result) {
          if (this.data.list.findIndex(hospital => hospital.id === result.hospital) === -1) {
            this.loadHospitals();
          }
        }
      });
    });
  }

}

