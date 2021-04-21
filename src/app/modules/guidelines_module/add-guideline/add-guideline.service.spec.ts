import { TestBed } from '@angular/core/testing';

import { AddGuidelineService } from './add-guideline.service';

describe('AddGuidelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddGuidelineService = TestBed.get(AddGuidelineService);
    expect(service).toBeTruthy();
  });
});
