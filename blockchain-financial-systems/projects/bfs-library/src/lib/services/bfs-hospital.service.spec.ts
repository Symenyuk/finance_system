import { TestBed } from '@angular/core/testing';

import { HospitalService } from './bfs-hospital.service';

describe('HospitalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HospitalService = TestBed.get(HospitalService);
    expect(service).toBeTruthy();
  });
});
