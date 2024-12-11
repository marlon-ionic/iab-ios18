import { TestBed } from '@angular/core/testing';

import { IABService } from './iab.service';

describe('IABService', () => {
  let service: IABService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IABService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
