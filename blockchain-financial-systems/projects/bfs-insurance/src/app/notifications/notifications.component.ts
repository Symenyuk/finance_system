import { Component, OnInit } from '@angular/core';
import { BFSConfigService, BFSApiService, BillService, Bill, Filter} from 'bfs-library';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  public loaded: boolean;
  public data: {total: number, list: Bill[]};
  public dataColumns: string[];
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;

  constructor(private billService: BillService) {
    const permissions = BFSApiService.getPermissions();
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = [];
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, interval: permissions.checkBillsIntervals[0]});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.dataColumns = ['status', 'created', 'updated', 'key', 'history', 'info'];
    this.loadHistory();
  }

  loadHistory(): void {
    const params = this.filter.getSelectedFields();
    this.data = {total: 0, list: []};
    this.loaded = false;
    this.billService.checkBills(params).then((bills: {total: number, list: Bill[]}) => {
      this.data = bills;
      this.loaded = true;
    });
  }

  handlePage(event): void {
    this.filter.fields = {offset: event.pageSize * event.pageIndex, count: event.pageSize};
    this.pageIndex = event.pageIndex;
    this.loadHistory();
  }

}
