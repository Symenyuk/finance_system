import { TestBed } from '@angular/core/testing';

import { BillService } from './bfs-bill.service';

describe('BillService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BillService = TestBed.get(BillService);
    expect(service).toBeTruthy();
  });
});
