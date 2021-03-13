import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillsStatisticsComponent } from './bills-statistics.component';

describe('BillsStatisticsComponent', () => {
  let component: BillsStatisticsComponent;
  let fixture: ComponentFixture<BillsStatisticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillsStatisticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillsStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
