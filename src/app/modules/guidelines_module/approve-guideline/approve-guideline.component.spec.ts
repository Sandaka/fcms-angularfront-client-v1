import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveGuidelineComponent } from './approve-guideline.component';

describe('ApproveGuidelineComponent', () => {
  let component: ApproveGuidelineComponent;
  let fixture: ComponentFixture<ApproveGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproveGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
