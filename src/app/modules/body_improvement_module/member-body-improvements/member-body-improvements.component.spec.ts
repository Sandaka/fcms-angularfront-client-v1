import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberBodyImprovementsComponent } from './member-body-improvements.component';

describe('MemberBodyImprovementsComponent', () => {
  let component: MemberBodyImprovementsComponent;
  let fixture: ComponentFixture<MemberBodyImprovementsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberBodyImprovementsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberBodyImprovementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
