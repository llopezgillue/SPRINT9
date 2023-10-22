import { TestBed } from '@angular/core/testing';

import { SightseeingService } from './sightseeing.service';

describe('SightseeingService', () => {
  let service: SightseeingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SightseeingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
