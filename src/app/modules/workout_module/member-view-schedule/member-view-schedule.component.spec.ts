import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberViewScheduleComponent } from './member-view-schedule.component';

describe('MemberViewScheduleComponent', () => {
  let component: MemberViewScheduleComponent;
  let fixture: ComponentFixture<MemberViewScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberViewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
