import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/internal/operators';

@Component({
  selector: 'lib-debounce-search',
  templateUrl: './debounce-search.component.html',
  styleUrls: ['./debounce-search.component.scss']
})
export class DebounceSearchComponent {

  @Input() label: string;
  @Input() placeholder: string;
  @Input() value: string;
  @Output() valueChange: EventEmitter<string>;
  public valueChanged: Subject<string> = new Subject<string>();

  constructor() {
    this.valueChange = new EventEmitter<string>();
    this.valueChanged.pipe(debounceTime(500), distinctUntilChanged()).subscribe(() => this.valueChange.emit(this.value));
  }

}
