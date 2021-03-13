import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, BFSApiService, HospitalService, Branch, Department, ConfirmationComponent, Filter } from 'bfs-library';
import { DepartmentDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Department[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public branch: Branch;

  constructor(private route: ActivatedRoute, private dialog: MatDialog, private api: BFSApiService, private hospitalService: HospitalService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['name'];
    BFSApiService.havePermission('edit_department').then(() => this.dataColumns.push('edit'));
    BFSApiService.havePermission('delete_department').then(() => this.dataColumns.push('delete'));
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      if (value.hasOwnProperty('id')) {
        this.hospitalService.getBranch(value.id).then((branch: Branch) => {
          this.branch = branch;
          this.loadDepartments();
        });
      }
    });
  }

  loadDepartments(): void {
    const params = this.filter.getSelectedFields();
    this.hospitalService.getDepartments({branch: this.branch.id, ...params}).then((departments: {total: number, list: Department[]}) => {
      this.data = departments;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadDepartments();
  }

  create(): void {
    BFSApiService.havePermission('create_department').then(() => {
      const dialogRef = this.dialog.open(DepartmentDialogComponent, {data: {branch: this.branch}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadDepartments(); } });
    });
  }

  edit(department: number): void {
    BFSApiService.havePermission('edit_department').then(() => {
      const dialogRef = this.dialog.open(DepartmentDialogComponent, {data: {department, branch: this.branch}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadDepartments(); } });
    });
  }

  delete(department: Department): void {
    BFSApiService.havePermission('delete_department').then(() => {
      const title = `Delete ${department.name} department`;
      const content = `Are you sure you want to delete ${department.name} department? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.hospitalService.deleteDepartment(department.id).then(() => {
            this.loadDepartments();
          });
        }
      });
    });
  }

}
