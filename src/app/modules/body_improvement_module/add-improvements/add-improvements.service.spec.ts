import { TestBed } from '@angular/core/testing';

import { AddImprovementsService } from './add-improvements.service';

describe('AddImprovementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddImprovementsService = TestBed.get(AddImprovementsService);
    expect(service).toBeTruthy();
  });
});
