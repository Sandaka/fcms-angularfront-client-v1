import { TestBed } from '@angular/core/testing';

import { DaterangeReportService } from './daterange-report.service';

describe('DaterangeReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DaterangeReportService = TestBed.get(DaterangeReportService);
    expect(service).toBeTruthy();
  });
});
