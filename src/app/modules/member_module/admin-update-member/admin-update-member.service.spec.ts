import { TestBed } from '@angular/core/testing';

import { AdminUpdateMemberService } from './admin-update-member.service';

describe('AdminUpdateMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUpdateMemberService = TestBed.get(AdminUpdateMemberService);
    expect(service).toBeTruthy();
  });
});
