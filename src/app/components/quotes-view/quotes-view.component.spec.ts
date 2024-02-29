import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesViewComponent } from './quotes-view.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { APIquotesService } from 'src/app/services/apiquotes.service';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
import { Quote } from 'src/app/interfaces';

describe('QuotesViewComponent', () => {
  let component: QuotesViewComponent;
  let fixture: ComponentFixture<QuotesViewComponent>;
  let crudService: CrudQuotesService;
  const mockQuotes = [
    { author: 'Author1', content: 'Content1' },
    { author: 'Author2', content: 'Content2' }
  ];
  const mockSelectedValue = 'Tag';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesViewComponent ],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ APIquotesService, CrudQuotesService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesViewComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudQuotesService);
    component.selectedValue = mockSelectedValue; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn onInit', () => {
    const spyGetTagQuotes = spyOn(component, 'getTagQuotes');
    const spyGetCreatedQuote = spyOn(component, 'getCreatedQuote');

    component.ngOnInit();

    expect(spyGetTagQuotes).toHaveBeenCalled();
    expect(spyGetCreatedQuote).toHaveBeenCalled();
  });

  it('fn clearFilters', () => {
    component.clearFilters();

    expect(component.selectedValue).toBe(null);
    expect(component.selectedValuePerPage).toBe(null);
    expect(component.quotes).toEqual([]);
    expect(component.showError).toBeFalsy();
    expect(component.showSearchIcon).toBeTruthy();
  });

  it('fn deleteCreatedNote - when quotes is not empty', () => {
    spyOn(crudService, 'deleteQuote');
    component.quotes = [{ author: 'Author', content: 'Content', tag: 'Tag' }];

    component.deleteCreatedNote();

    expect(crudService.deleteQuote).toHaveBeenCalled();
  });

  it('fn deleteCreatedNote - when quotes is empty', () => {
    component.quotes = [];

    component.deleteCreatedNote();

    expect(component.showSearchIcon).toBe(true);
  })

  it('fn closeModal', () => {
    component.closeModal();

    expect(component.createQuote).toBeFalsy();
  })

  it('fn getCreatedQuote - when new quote is valid', () => {
    const mockQuote: Quote = { 
      author: 'Author', 
      content: 'Content',
      _id: '',
      name: ''
     };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockQuote);

    component.getCreatedQuote();

    expect(component.showCard).toBeTrue();
    expect(component.showSearchIcon).toBeFalse();
  });

  it('fn getCreatedQuote - when new quote is invalid', () => {
    const mockInvalidQuote : Quote = { 
      author: '', 
      content: '',
      _id: '',
      name: ''
     };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockInvalidQuote);

    component.getCreatedQuote();

    expect(component.showCard).toBeFalse();
    expect(component.showSearchIcon).toBeTrue();
  });

  it('fn getQuotes', () => {
    const mockQuotes = [
      { author: 'Author1', content: 'Content1', tag: '' },
      { author: 'Author2', content: 'Content2', tag: '' }
    ];

    const getCreatedQuoteSpy =  spyOn(component, 'getCreatedQuote').and.callThrough();

    component.getQuotes(mockQuotes);

    expect(getCreatedQuoteSpy).toHaveBeenCalled();
  });

    /*  test the getEditQuote function, it causes a full page reload! */

});
