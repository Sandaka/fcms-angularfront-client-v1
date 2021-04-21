import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBodyImprovementsComponent } from './trainer-body-improvements.component';

describe('TrainerBodyImprovementsComponent', () => {
  let component: TrainerBodyImprovementsComponent;
  let fixture: ComponentFixture<TrainerBodyImprovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerBodyImprovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerBodyImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
