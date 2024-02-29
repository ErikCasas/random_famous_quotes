import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'

import { APIquotesService } from './apiquotes.service';

describe('APIquotesService', () => {
  let service: APIquotesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIquotesService]
    });
    service = TestBed.inject(APIquotesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTagQuotes and return data', () => {
    const mockData = [
      { id: '1', name: 'Tag1' },
      { id: '2', name: 'Tag2' }
    ];

    service.getTagQuotes().subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('https://api.quotable.io/tags');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('should call getQuotesByTags and return data', () => {
    const mockData = [
      { author: 'Author1', content: 'Content1' },
      { author: 'Author2', content: 'Content2' }
    ];
    const tag = 'testing';
    const pageNumber = 1;

    service.getQuotesByTags(tag, pageNumber).subscribe(data => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(`https://api.quotable.io/quotes/?tags=${tag}&page=${pageNumber}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });
});
