import { TestBed } from '@angular/core/testing';

import { KorpeService } from './korpe.service';

describe('KorpeService', () => {
  let service: KorpeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KorpeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
