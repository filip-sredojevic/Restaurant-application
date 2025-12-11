import { TestBed } from '@angular/core/testing';

import { PomocniService } from './pomocni.service';

describe('PomocniService', () => {
  let service: PomocniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PomocniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
