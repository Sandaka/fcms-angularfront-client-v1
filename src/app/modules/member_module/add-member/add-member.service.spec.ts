import { TestBed } from '@angular/core/testing';

import { AddMemberService } from './add-member.service';

describe('AddMemberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddMemberService = TestBed.get(AddMemberService);
    expect(service).toBeTruthy();
  });
});
