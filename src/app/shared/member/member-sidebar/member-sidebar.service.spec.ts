import { TestBed } from '@angular/core/testing';

import { MemberSidebarService } from './member-sidebar.service';

describe('MemberSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberSidebarService = TestBed.get(MemberSidebarService);
    expect(service).toBeTruthy();
  });
});
