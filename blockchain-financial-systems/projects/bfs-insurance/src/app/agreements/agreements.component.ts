import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BFSConfigService, AccountService, AgreementService, Agreement, IOption, Filter, AgreementDetailsComponent } from 'bfs-library';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

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
    date: IOption[]
  };
  public filter: Filter;
  public pageSize: number[];
  public pageIndex: number;
  public hospitalChanged: Subject<string> = new Subject<string>();

  constructor(private dialog: MatDialog, private accountService: AccountService, private agreementService: AgreementService) {
    this.loaded = false;
    this.data = {total: 0, list: []};
    this.dataColumns = ['hospital', 'contact', 'date', 'payment', 'penalty', 'info'];
    this.options = {date: []};
    this.filter = new Filter({offset: 0, count: BFSConfigService.settings.pageSize.default, date: -1, hospital: ''});
    this.pageSize = BFSConfigService.settings.pageSize.options;
    this.pageIndex = 0;
    this.hospitalChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => this.loadAgreements());
  }

  ngOnInit(): void {
    const account = this.accountService.getAccount();
    this.options.date = account['options'].date;
    this.loadAgreements();
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

  showDetails(agreement: number): void {
    this.dialog.open(AgreementDetailsComponent, {data: {agreement}, panelClass: 'relative', width: '500px', disableClose: true});
  }

}
