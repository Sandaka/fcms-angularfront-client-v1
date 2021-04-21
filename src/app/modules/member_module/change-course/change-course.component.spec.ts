import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCourseComponent } from './change-course.component';

describe('ChangeCourseComponent', () => {
  let component: ChangeCourseComponent;
  let fixture: ComponentFixture<ChangeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
