import { TestBed } from '@angular/core/testing';

import { AdminUpdateUserService } from './admin-update-user.service';

describe('AdminUpdateUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdminUpdateUserService = TestBed.get(AdminUpdateUserService);
    expect(service).toBeTruthy();
  });
});
