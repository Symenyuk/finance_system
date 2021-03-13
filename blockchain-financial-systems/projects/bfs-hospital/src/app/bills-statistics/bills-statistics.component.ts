import { Component, OnInit } from '@angular/core';
import { BFSApiService, HospitalService, BillService } from 'bfs-library';

@Component({
  selector: 'app-bills-statistics',
  templateUrl: './bills-statistics.component.html',
  styleUrls: ['./bills-statistics.component.scss']
})
export class BillsStatisticsComponent implements OnInit {

  public statistics: any[];
  public dataColumns: string[];
  public insurance: number;
  public insuranceOptions: any[];

  constructor(private api: BFSApiService, private hospitalService: HospitalService, private billService: BillService) {
    this.statistics = [];
    this.dataColumns = ['number', 'amount', 'paidByPatient', 'payByInsurance', 'dispute', 'approved', 'paid', 'chargesDue', 'chargesPaid'];
    this.insurance = -1;
    this.insuranceOptions = [];
  }

  ngOnInit(): void {
    this.hospitalService.getInsuranceOptions().then((data: any[]) => {
      this.insuranceOptions = data;
      this.insuranceOptions.unshift({value: -1, label: 'All'});
    });
    this.load();
  }

  load(): void {
    this.billService.getBillsStatistics(this.insurance !== -1 ? {insurance: this.insurance} : {}).then((data: any[]) => {
      const row = data.reduce((obj, el) => Object.assign(obj, el), {});
      this.statistics = [row];
    });
  }

}
