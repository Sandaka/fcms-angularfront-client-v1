import { TestBed } from '@angular/core/testing';

import { TrainerBodyImprovementsService } from './trainer-body-improvements.service';

describe('TrainerBodyImprovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerBodyImprovementsService = TestBed.get(TrainerBodyImprovementsService);
    expect(service).toBeTruthy();
  });
});
