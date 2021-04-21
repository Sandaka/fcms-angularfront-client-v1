import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUpdateMemberComponent } from './admin-update-member.component';

describe('AdminUpdateMemberComponent', () => {
  let component: AdminUpdateMemberComponent;
  let fixture: ComponentFixture<AdminUpdateMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUpdateMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUpdateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
