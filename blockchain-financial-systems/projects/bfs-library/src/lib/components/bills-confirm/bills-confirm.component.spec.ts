import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsConfirmComponent } from './bills-confirm.component';

describe('BillsConfirmComponent', () => {
  let component: BillsConfirmComponent;
  let fixture: ComponentFixture<BillsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
