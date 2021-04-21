import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerViewScheduleComponent } from './trainer-view-schedule.component';

describe('TrainerViewScheduleComponent', () => {
  let component: TrainerViewScheduleComponent;
  let fixture: ComponentFixture<TrainerViewScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerViewScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerViewScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
