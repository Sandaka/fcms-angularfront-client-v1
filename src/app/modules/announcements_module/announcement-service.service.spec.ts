import { TestBed } from '@angular/core/testing';

import { AnnouncementServiceService } from './announcement-service.service';

describe('AnnouncementServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnnouncementServiceService = TestBed.get(AnnouncementServiceService);
    expect(service).toBeTruthy();
  });
});
