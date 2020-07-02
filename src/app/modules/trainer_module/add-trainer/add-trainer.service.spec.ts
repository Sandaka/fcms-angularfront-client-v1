import { TestBed } from '@angular/core/testing';

import { AddTrainerService } from './add-trainer.service';

describe('AddTrainerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddTrainerService = TestBed.get(AddTrainerService);
    expect(service).toBeTruthy();
  });
});
