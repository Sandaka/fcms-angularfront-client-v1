import { TestBed } from '@angular/core/testing';

import { ViewTrainersService } from './view-trainers.service';

describe('ViewTrainersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewTrainersService = TestBed.get(ViewTrainersService);
    expect(service).toBeTruthy();
  });
});
