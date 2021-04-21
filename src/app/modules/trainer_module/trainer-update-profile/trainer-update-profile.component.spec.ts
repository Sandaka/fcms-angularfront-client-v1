import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerUpdateProfileComponent } from './trainer-update-profile.component';

describe('TrainerUpdateProfileComponent', () => {
  let component: TrainerUpdateProfileComponent;
  let fixture: ComponentFixture<TrainerUpdateProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerUpdateProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerUpdateProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
