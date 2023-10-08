import { TestBed } from '@angular/core/testing';

import { AcompanantesService } from './acompañante.service';

describe('AcompanantesService', () => {
  let service: AcompanantesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AcompanantesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
