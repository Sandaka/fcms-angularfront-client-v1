import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerSidebarComponent } from './trainer-sidebar.component';

describe('TrainerSidebarComponent', () => {
  let component: TrainerSidebarComponent;
  let fixture: ComponentFixture<TrainerSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainerSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainerSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
