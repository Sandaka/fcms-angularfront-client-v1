import { TestBed } from '@angular/core/testing';

import { MemberViewScheduleService } from './member-view-schedule.service';

describe('MemberViewScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberViewScheduleService = TestBed.get(MemberViewScheduleService);
    expect(service).toBeTruthy();
  });
});
