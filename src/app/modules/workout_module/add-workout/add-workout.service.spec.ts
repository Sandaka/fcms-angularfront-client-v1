import { TestBed } from '@angular/core/testing';

import { AddWorkoutService } from './add-workout.service';

describe('AddWorkoutService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddWorkoutService = TestBed.get(AddWorkoutService);
    expect(service).toBeTruthy();
  });
});
