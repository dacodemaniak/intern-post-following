import { TestBed } from '@angular/core/testing';

import { IntlService } from './intl.service';

describe('IntlService', () => {
  let service: IntlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
