import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOnlyGuidelineComponent } from './view-only-guideline.component';

describe('ViewOnlyGuidelineComponent', () => {
  let component: ViewOnlyGuidelineComponent;
  let fixture: ComponentFixture<ViewOnlyGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOnlyGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOnlyGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
