import { Component, OnInit } from '@angular/core';
import { Quote, QuoteData } from 'src/app/interfaces';
import { APIquotesService } from 'src/app/services/apiquotes.service';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';

@Component({
  selector: 'app-quotes-view',
  templateUrl: './quotes-view.component.html',
  styleUrls: ['./quotes-view.component.scss'],
})
export class QuotesViewComponent implements OnInit {
  selectedValue: string | null = '';
  selectedValuePerPage: string | null = '';

  categories: { id: any; name: string }[] = [];

  quotes: { author: string; content: string; tag: string | null }[] = [];

  showError: boolean = false;
  showSearchIcon: boolean = true;

  showCard: boolean = false;

  createQuote = false;

  constructor(private quoteService: APIquotesService,
    private crudService: CrudQuotesService) {}

  ngOnInit(): void {
    this.getTagQuotes();
    this.getCreatedQuote();    
  }

  clearFilters() {
    this.selectedValue = null; // Restablecer la selección de categoría
    this.selectedValuePerPage = null;
    this.quotes = [];
    this.showError = false;
    this.showSearchIcon = true;
  }

  getTagQuotes() {
    this.categories = [];

    this.quoteService.getTagQuotes().subscribe({
      next: (data: Object) => {
        const quoteData = data as QuoteData;
        Object.values(quoteData).forEach((quote: Quote) => {
          let tagCategory = { id: quote._id, name: quote.name };
          this.categories.push(tagCategory);
        });
      },
    });
  }

  searchQuoteByCategory() {
    this.quotes = [];
    this.quoteService.getQuotesByTags(this.selectedValue, 2).subscribe({
      next: (data: any) => {
        const quotes = data.results.slice(0, 10);
        if (quotes.length === 0) {
          this.showError = true;
          this.showSearchIcon = false;          
        } else {
          this.showSearchIcon = false;
          this.showError = false;
          this.getQuotes(quotes);
        }
      },
    });
  }
 
  getQuotes(quotes: any){

    quotes.forEach((quote: any) => {
      const author = quote.author;
      const content = quote.content;

      let tagCategory = {
        author: author,
        content: content,
        tag: this.selectedValue,
      };
      this.quotes.push(tagCategory);
    });

    this.getCreatedQuote();
  }

  getCreatedQuote(){
    const newQuote: Quote = this.crudService.getSavedQuotes();
    console.log(newQuote);
    if(newQuote && newQuote.author && newQuote.content){
      this.crudService.addQuote(this.quotes, newQuote);
      this.showCard = true;
      this.showSearchIcon = false;
    } else {
      this.showCard = false;
      this.showSearchIcon = true;
    }
  }

  deleteCreatedNote(){
    if(this.quotes.length > 0){
      this.crudService.deleteQuote();
    } else {
      this.showSearchIcon = true;
    }
  }

  closeModal(){
    this.createQuote = false;
  }
}
