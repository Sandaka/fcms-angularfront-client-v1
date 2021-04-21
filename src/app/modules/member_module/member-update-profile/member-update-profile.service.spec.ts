import { TestBed } from '@angular/core/testing';

import { MemberUpdateProfileService } from './member-update-profile.service';

describe('MemberUpdateProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberUpdateProfileService = TestBed.get(MemberUpdateProfileService);
    expect(service).toBeTruthy();
  });
});
