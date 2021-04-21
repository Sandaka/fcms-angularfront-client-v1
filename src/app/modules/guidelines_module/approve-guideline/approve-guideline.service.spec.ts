import { TestBed } from '@angular/core/testing';

import { ApproveGuidelineService } from './approve-guideline.service';

describe('ApproveGuidelineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApproveGuidelineService = TestBed.get(ApproveGuidelineService);
    expect(service).toBeTruthy();
  });
});
