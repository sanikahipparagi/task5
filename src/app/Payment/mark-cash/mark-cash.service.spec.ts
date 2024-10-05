import { TestBed } from '@angular/core/testing';

import { MarkCashService } from './mark-cash.service';

describe('MarkCashService', () => {
  let service: MarkCashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkCashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
