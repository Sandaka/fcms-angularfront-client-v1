import { TestBed } from '@angular/core/testing';

import { AnnualReportService } from './annual-report.service';

describe('AnnualReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnualReportService = TestBed.get(AnnualReportService);
    expect(service).toBeTruthy();
  });
});
