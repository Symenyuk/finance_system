import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'lib-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss', '../components.scss']
})
export class ConfirmationComponent {

  public title: string;
  public content: string;
  public confirmation: boolean;
  public password: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private ref: MatDialogRef<ConfirmationComponent>) {
    this.title = data && data.hasOwnProperty('title') ? data.title : '';
    this.content = data && data.hasOwnProperty('content') ? data.content : '';
    this.confirmation = data && data.hasOwnProperty('confirmation') ? data.confirmation : false;
  }

  confirm() {
    this.ref.close(this.confirmation ? this.password : true);
  }

}
