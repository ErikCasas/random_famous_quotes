import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuotesComponent } from './card-quotes.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
import { Quote } from 'src/app/interfaces';

describe('CardQuotesComponent', () => {
  let component: CardQuotesComponent;
  let fixture: ComponentFixture<CardQuotesComponent>;
  let crudService: CrudQuotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuotesComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [ CrudQuotesService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardQuotesComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudQuotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn ngOnInit', () => {
    const getSavedQuotes = spyOn(crudService, 'getSavedQuotes')

    component.ngOnInit();

    expect(getSavedQuotes).toHaveBeenCalled();
  });
  
  it('fn closeModal', () => {
    expect(component.createQuote).toBeFalsy();
  });

  it('fn openModal', () => {
    const deleteSpy = spyOn(crudService, 'deleteQuote');
    
    component.openModal();
    
    expect(deleteSpy).toHaveBeenCalled();
    expect(component.createQuote).toBeTruthy();
  });

  it('fn deleteQuote', () => {
    const emitSpy = spyOn(component.newQuoteDeleted, 'emit');
    const deleteSpy = spyOn(crudService, 'deleteQuote');
    
    component.deleteQuote();
    
    expect(emitSpy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('fn editQuote - when quote is not empty', () => {
    const mockQuote: Quote = {
      "_id": "scBvf0Y5W3B",
      "name": '',
      "author": "",
      "content": "To me, it doesn't matter how good you are. Sport is all about playing and competing. Whatever you do in cricket and in sport, enjoy it, be positive and try to win.",
      "authorSlug": "ian-botham",
      "length": 163,
      "dateAdded": "2022-07-06",
      "dateModified": "2023-04-14"
    };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockQuote);
    const editQuoteSpy = spyOn(crudService, 'editQuote');
    
    component.editQuote();
    
    expect(editQuoteSpy).not.toHaveBeenCalled();
  });
});
