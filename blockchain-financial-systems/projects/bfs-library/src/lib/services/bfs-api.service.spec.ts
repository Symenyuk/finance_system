import { TestBed } from '@angular/core/testing';

import { BFSApiService } from './bfs-api.service';

describe('BFSApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BFSApiService = TestBed.get(BFSApiService);
    expect(service).toBeTruthy();
  });
});
