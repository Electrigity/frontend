import { TestBed } from '@angular/core/testing';

import { OpenPopupService } from './openPopup.service';

describe('UsernameService', () => {
  let service: OpenPopupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenPopupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
