import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'lib-activate-account',
  templateUrl: './bill-message.component.html',
  styleUrls: ['./bill-message.component.scss', '../components.scss']
})
export class BillMessageComponent {

  public messageForm: FormGroup;

  get form() { return this.messageForm.controls; }

  constructor() {
    this.messageForm = new FormGroup({
      message: new FormControl('')
    });
  }

}
