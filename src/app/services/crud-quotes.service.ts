import { Injectable } from '@angular/core';
import { Quote } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudQuotesService {

  constructor() { }

  addNewQuote(newQuote: any): void{
    localStorage.setItem('quotes', JSON.stringify(newQuote));
  }
  
  getSavedQuotes(): Quote {
    const quotesString = localStorage.getItem('quotes');
    return quotesString ? JSON.parse(quotesString) : [];
  }
  
  addQuote(quotes: any[], newQuote: any): void {
    if (quotes.length >= 10) {
      quotes.shift();
    }
    quotes.push(newQuote);
  }

  deleteQuote(){
    localStorage.removeItem('quotes');
  }

  editQuote(newQuote: any){
    localStorage.setItem('quotes', JSON.stringify(newQuote));
  }

}
