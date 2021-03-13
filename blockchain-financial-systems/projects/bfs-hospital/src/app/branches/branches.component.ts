import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BFSConfigService, BFSApiService, HospitalService, Branch, ConfirmationComponent, Filter } from 'bfs-library';
import { MatDialog } from '@angular/material/dialog';
import { BranchDialogComponent } from '../dialogs/dialogs';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Branch[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private router: Router, private dialog: MatDialog, private api: BFSApiService, private hospitalService: HospitalService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['name', 'manager', 'address', 'contacts'];
    BFSApiService.havePermission('edit_branch').then(() => this.dataColumns.push('edit'));
    BFSApiService.havePermission('get_all_departments').then(() => this.dataColumns.push('departments'));
    BFSApiService.havePermission('delete_branch').then(() => this.dataColumns.push('delete'));
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    const params = this.filter.getSelectedFields();
    this.hospitalService.getBranches(params).then((data: {total: number, list: Branch[]}) => {
      this.data = data;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadBranches();
  }

  create(): void {
    BFSApiService.havePermission('create_branch').then(() => {
      const dialogRef = this.dialog.open(BranchDialogComponent, {width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadBranches(); } });
    });
  }

  edit(branch: number): void {
    BFSApiService.havePermission('edit_branch').then(() => {
      const dialogRef = this.dialog.open(BranchDialogComponent, {data: {branch}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => { if (result) { this.loadBranches(); } });
    });
  }

  delete(branch: Branch): void {
    BFSApiService.havePermission('delete_branch').then(() => {
      const title = `Delete ${branch.name} branch`;
      const content = `Are you sure you want to delete ${branch.name} branch? This action cannot be undone.`;
      const dialogRef = this.dialog.open(ConfirmationComponent, {data: {title, content}, width: '500px', disableClose: true});
      dialogRef.afterClosed().subscribe((result: boolean) => {
        if (result) {
          this.hospitalService.deleteBranch(branch.id).then(() => {
            this.loadBranches();
          });
        }
      });
    });
  }

  departments(id: number): void {
    this.router.navigateByUrl(`branches/${id}`).then();
  }

}
