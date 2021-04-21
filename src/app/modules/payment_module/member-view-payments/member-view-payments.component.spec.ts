import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewPaymentsComponent } from './member-view-payments.component';

describe('MemberViewPaymentsComponent', () => {
  let component: MemberViewPaymentsComponent;
  let fixture: ComponentFixture<MemberViewPaymentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewPaymentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
