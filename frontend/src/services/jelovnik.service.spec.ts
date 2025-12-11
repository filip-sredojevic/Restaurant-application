import { TestBed } from '@angular/core/testing';

import { JelovnikService } from './jelovnik.service';

describe('JelovnikService', () => {
  let service: JelovnikService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JelovnikService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
