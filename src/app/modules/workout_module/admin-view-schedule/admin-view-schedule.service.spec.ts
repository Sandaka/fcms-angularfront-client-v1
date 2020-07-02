import { TestBed } from '@angular/core/testing';

import { AdminViewScheduleService } from './admin-view-schedule.service';

describe('AdminViewScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminViewScheduleService = TestBed.get(AdminViewScheduleService);
    expect(service).toBeTruthy();
  });
});
