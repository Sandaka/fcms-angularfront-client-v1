import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGuidelineComponent } from './add-guideline.component';

describe('AddGuidelineComponent', () => {
  let component: AddGuidelineComponent;
  let fixture: ComponentFixture<AddGuidelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGuidelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGuidelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
