import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddImprovementsComponent } from './add-improvements.component';

describe('AddImprovementsComponent', () => {
  let component: AddImprovementsComponent;
  let fixture: ComponentFixture<AddImprovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddImprovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
