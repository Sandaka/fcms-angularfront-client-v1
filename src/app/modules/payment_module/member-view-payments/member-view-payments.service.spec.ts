import { TestBed } from '@angular/core/testing';

import { MemberViewPaymentsService } from './member-view-payments.service';

describe('MemberViewPaymentsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberViewPaymentsService = TestBed.get(MemberViewPaymentsService);
    expect(service).toBeTruthy();
  });
});
