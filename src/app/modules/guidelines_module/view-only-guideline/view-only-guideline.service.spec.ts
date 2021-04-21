import { TestBed } from '@angular/core/testing';

import { ViewOnlyGuidelineService } from './view-only-guideline.service';

describe('ViewOnlyGuidelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViewOnlyGuidelineService = TestBed.get(ViewOnlyGuidelineService);
    expect(service).toBeTruthy();
  });
});
