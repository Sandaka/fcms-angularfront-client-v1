import { TestBed } from '@angular/core/testing';

import { ChangeCourseService } from './change-course.service';

describe('ChangeCourseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangeCourseService = TestBed.get(ChangeCourseService);
    expect(service).toBeTruthy();
  });
});
