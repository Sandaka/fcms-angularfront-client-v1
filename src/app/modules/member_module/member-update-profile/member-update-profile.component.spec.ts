import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberUpdateProfileComponent } from './member-update-profile.component';

describe('MemberUpdateProfileComponent', () => {
  let component: MemberUpdateProfileComponent;
  let fixture: ComponentFixture<MemberUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
