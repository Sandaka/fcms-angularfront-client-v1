import { TestBed } from '@angular/core/testing';

import { ImprovementReportService } from './improvement-report.service';

describe('ImprovementReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImprovementReportService = TestBed.get(ImprovementReportService);
    expect(service).toBeTruthy();
  });
});
