import { TestBed } from '@angular/core/testing';

import { CrudQuotesService } from './crud-quotes.service';

describe('CrudQuotesService', () => {
  let service: CrudQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
