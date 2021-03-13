import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BillService } from '../../services/bfs-bill.service';
import { BillHistory } from '../../models/bill.model';

@Component({
  selector: 'lib-bill-history',
  templateUrl: './bill-history.component.html',
  styleUrls: ['./bill-history.component.scss', '../components.scss']
})
export class BillHistoryComponent implements OnInit {

  public loaded: boolean;
  public history: BillHistory[];
  public dataColumns: string[];

  constructor(@Inject(MAT_DIALOG_DATA) private data, private dialog: MatDialog, private ref: MatDialogRef<BillHistoryComponent>, private service: BillService) {
    this.loaded = false;
    this.history = [];
    this.dataColumns = ['status', 'message', 'who', 'updated'];
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('key')) {
      this.service.getBillHistory(this.data.key).then((history: BillHistory[]) => {
        this.history = history;
        this.loaded = true;
      });
    }
  }

}
