import { TestBed } from '@angular/core/testing';

import { BFSConfigService } from './bfs-config.service';

describe('BFSConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BFSConfigService = TestBed.get(BFSConfigService);
    expect(service).toBeTruthy();
  });
});
