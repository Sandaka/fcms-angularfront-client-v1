import { TestBed } from '@angular/core/testing';

import { TrainerUpdateProfileService } from './trainer-update-profile.service';

describe('TrainerUpdateProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerUpdateProfileService = TestBed.get(TrainerUpdateProfileService);
    expect(service).toBeTruthy();
  });
});
