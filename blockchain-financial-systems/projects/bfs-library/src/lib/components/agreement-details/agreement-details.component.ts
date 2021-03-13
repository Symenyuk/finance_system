import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AgreementService } from '../../services/bfs-agreement.service';
import { Agreement } from '../../models/agreement.model';

@Component({
  selector: 'lib-agreement-details',
  templateUrl: './agreement-details.component.html',
  styleUrls: ['./agreement-details.component.scss', '../components.scss']
})
export class AgreementDetailsComponent implements OnInit {

  public agreement: Agreement;

  constructor(@Inject(MAT_DIALOG_DATA) private data, private ref: MatDialogRef<AgreementDetailsComponent>, private service: AgreementService, private snack: MatSnackBar) {
    if (!(data && data.hasOwnProperty('agreement'))) {
      const snackMessage = `Wrong agreement data: missing agreement id`;
      const snackOptions = {
        duration: 5000,
        horizontalPosition: 'end' as MatSnackBarHorizontalPosition,
        verticalPosition: 'bottom' as MatSnackBarVerticalPosition
      };
      ref.close();
      this.snack.open(snackMessage, 'Hide', {...snackOptions, panelClass: 'error-snack'});
    }
  }

  ngOnInit(): void {
    this.service.getAgreement(this.data.agreement).then((agreement: Agreement) => {
      this.agreement = agreement;
    });
  }

}
