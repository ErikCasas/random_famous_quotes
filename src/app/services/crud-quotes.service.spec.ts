import { TestBed } from '@angular/core/testing';

import { CrudQuotesService } from './crud-quotes.service';
import { Quote } from '../interfaces';

describe('CrudQuotesService', () => {
  let service: CrudQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudQuotesService]
    });
    service = TestBed.inject(CrudQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fn addNewQuote', () => {
    const mockQuote = { author: 'Author', content: 'Content', tag: 'Tag' };

    spyOn(localStorage, 'setItem');

    service.addNewQuote(mockQuote);

    expect(localStorage.setItem).toHaveBeenCalledWith('quotes', JSON.stringify(mockQuote));
  });

  it('fn getSavedQuotes', () => {
    const mockQuote: Quote = { 
      _id: '1', 
      name: 'Quote Name',
      author: 'Author', 
      content: 'Content', 
    };
    localStorage.setItem('quotes', JSON.stringify(mockQuote));
    const savedQuote = service.getSavedQuotes();
    expect(savedQuote).toEqual(mockQuote);
  });

  it('fn addQuote', () => {
    const mockQuotes = Array.from({ length: 10 }, (_, index) => ({ id: index }));
    const newQuote = { id: 10 };
    service.addQuote(mockQuotes, newQuote);
    expect(mockQuotes.length).toBe(10);
    expect(mockQuotes).not.toContain({ id: 0 });
    expect(mockQuotes).toContain(newQuote);
  });

  it('fn deleteQuote', () => {
    localStorage.setItem('quotes', JSON.stringify({ author: 'Author', content: 'Content', tag: 'Tag' }));
    service.deleteQuote();
    expect(localStorage.getItem('quotes')).toBe(null);
  });

  it('fn editQuote', () => {
    const editedQuote = { author: 'New Author', content: 'New Content', tag: 'New Tag' };
    spyOn(localStorage, 'setItem'); // Espiar el método setItem de localStorage
  
    service.editQuote(editedQuote);
  
    expect(localStorage.setItem).toHaveBeenCalledWith('quotes', JSON.stringify(editedQuote));
  });
  
});
