import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnpaidMembersComponent } from './unpaid-members.component';

describe('UnpaidMembersComponent', () => {
  let component: UnpaidMembersComponent;
  let fixture: ComponentFixture<UnpaidMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnpaidMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnpaidMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
