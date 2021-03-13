import { TestBed } from '@angular/core/testing';

import { BFSLocationService } from './bfs-location.service';

describe('BFSLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BFSLocationService = TestBed.get(BFSLocationService);
    expect(service).toBeTruthy();
  });
});
