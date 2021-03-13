import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, HospitalService, Service, ConfirmationComponent, Filter } from 'bfs-library';
import { ServiceDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Service[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private dialog: MatDialog, private api: BFSApiService, private hospitalService: HospitalService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['name'];
    BFSApiService.havePermission('edit_service').then(() => this.dataColumns.push('edit'));
    BFSApiService.havePermission('delete_service').then(() => this.dataColumns.push('delete'));
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    const params = this.filter.getSelectedFields();
    this.hospitalService.getServices(params).then((services: {total: number, list: Service[]}) => {
      this.data = services;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadServices();
  }

  create(): void {
    BFSApiService.havePermission('create_service').then(() => {
      const dialogRef = this.dialog.open(ServiceDialogComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadServices(); } });
    });
  }

  edit(service: number): void {
    BFSApiService.havePermission('edit_service').then(() => {
      const dialogRef = this.dialog.open(ServiceDialogComponent, {data: {service}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadServices(); } });
    });
  }

  delete(service: Service): void {
    BFSApiService.havePermission('delete_service').then(() => {
      const title = `Delete ${service.name} service`;
      const content = `Are you sure you want to delete ${service.name} service? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.hospitalService.deleteService(service.id).then(() => {
            this.loadServices();
          });
        }
      });
    });
  }

}
