import { TestBed } from '@angular/core/testing';

import { TrainerSidebarService } from './trainer-sidebar.service';

describe('TrainerSidebarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TrainerSidebarService = TestBed.get(TrainerSidebarService);
    expect(service).toBeTruthy();
  });
});
