import { TestBed } from '@angular/core/testing';

import { APIquotesService } from './apiquotes.service';

describe('APIquotesService', () => {
  let service: APIquotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIquotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
