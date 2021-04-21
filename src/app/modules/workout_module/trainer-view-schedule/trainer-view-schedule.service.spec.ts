import { TestBed } from '@angular/core/testing';

import { TrainerViewScheduleService } from './trainer-view-schedule.service';

describe('TrainerViewScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerViewScheduleService = TestBed.get(TrainerViewScheduleService);
    expect(service).toBeTruthy();
  });
});
