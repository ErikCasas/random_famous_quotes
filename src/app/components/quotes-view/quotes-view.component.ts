import { Component, OnInit } from '@angular/core';
import { Quote, QuoteData } from 'src/app/interfaces';
import { APIquotesService } from 'src/app/services/apiquotes.service';

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

  // itemsPerPage = [
  //   { value: 1, viewValue: '1' },
  //   { value: 5, viewValue: '5' },
  //   { value: 10, viewValue: '10' },
  // ];

  constructor(private quoteService: APIquotesService) {}

  ngOnInit(): void {
    this.getTagQuotes();
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
        }
      },
    });
  }
}
