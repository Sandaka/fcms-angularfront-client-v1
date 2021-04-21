import { TestBed } from '@angular/core/testing';

import { MemberBodyImprovementsService } from './member-body-improvements.service';

describe('MemberBodyImprovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberBodyImprovementsService = TestBed.get(MemberBodyImprovementsService);
    expect(service).toBeTruthy();
  });
});
