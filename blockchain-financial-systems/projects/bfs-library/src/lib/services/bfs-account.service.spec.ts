import { TestBed } from '@angular/core/testing';

import { AccountService } from './bfs-account.service';

describe('AccountService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountService = TestBed.get(AccountService);
    expect(service).toBeTruthy();
  });
});
