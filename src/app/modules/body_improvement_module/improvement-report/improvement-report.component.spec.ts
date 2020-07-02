import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovementReportComponent } from './improvement-report.component';

describe('ImprovementReportComponent', () => {
  let component: ImprovementReportComponent;
  let fixture: ComponentFixture<ImprovementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovementReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
