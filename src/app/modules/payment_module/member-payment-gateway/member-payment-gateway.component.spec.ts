import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPaymentGatewayComponent } from './member-payment-gateway.component';

describe('MemberPaymentGatewayComponent', () => {
  let component: MemberPaymentGatewayComponent;
  let fixture: ComponentFixture<MemberPaymentGatewayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPaymentGatewayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPaymentGatewayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
