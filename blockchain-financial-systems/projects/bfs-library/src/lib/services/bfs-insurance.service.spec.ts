import { TestBed } from '@angular/core/testing';

import { InsuranceService } from './bfs-insurance.service';

describe('InsuranceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InsuranceService = TestBed.get(InsuranceService);
    expect(service).toBeTruthy();
  });
});
