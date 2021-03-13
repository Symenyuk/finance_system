import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgreementService } from '../../services/bfs-agreement.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'lib-export-invoice',
  templateUrl: './export-invoice.component.html',
  styleUrls: ['./export-invoice.component.scss', '../components.scss']
})
export class ExportInvoiceComponent implements OnInit {

  private pdf: Blob;
  public finished: boolean;
  public postErrors: Error[];

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<ExportInvoiceComponent>, private service: AgreementService) {
    this.pdf = null;
    this.finished = false;
  }

  ngOnInit(): void {
    if (this.data && this.data.hasOwnProperty('params')) {
      this.service
        .exportInvoice(this.data.params)
        .then((data: any) => this.pdf = data)
        .catch((errors: Error[]) => this.postErrors = errors)
        .finally(() => this.finished = true);
    }
  }

  open(): void {
    const url = URL.createObjectURL(this.pdf);
    window.open(url);
  }

  download(): void {
    saveAs(this.pdf, `report-${new Date().toISOString().split('T')[0]}`);
  }

}
