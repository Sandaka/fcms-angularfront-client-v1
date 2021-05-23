import { TestBed } from '@angular/core/testing';

import { MemberPaymentGatewayService } from './member-payment-gateway.service';

describe('MemberPaymentGatewayService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberPaymentGatewayService = TestBed.get(MemberPaymentGatewayService);
    expect(service).toBeTruthy();
  });
});
