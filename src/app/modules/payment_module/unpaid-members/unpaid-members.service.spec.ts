import { TestBed } from '@angular/core/testing';

import { UnpaidMembersService } from './unpaid-members.service';

describe('UnpaidMembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UnpaidMembersService = TestBed.get(UnpaidMembersService);
    expect(service).toBeTruthy();
  });
});
