import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Quote } from 'src/app/interfaces';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';

@Component({
  selector: 'app-card-quotes',
  templateUrl: './card-quotes.component.html',
  styleUrls: ['./card-quotes.component.scss']
})
export class CardQuotesComponent implements OnInit {

  @Input() quotes: any;
  @Output() newQuoteDeleted: EventEmitter<void> = new EventEmitter<void>();
  

  createQuote = false;

  constructor(private crudService: CrudQuotesService) { }

  ngOnInit(): void {
    this.crudService.getSavedQuotes();
  }

  closeModal(){
    this.createQuote = false;
  }

  openModal(){
    this.crudService.deleteQuote();
    this.createQuote = true;
  }

  deleteQuote(){
    this.crudService.deleteQuote();
    this.newQuoteDeleted.emit();
  }
  
  editQuote(){
    const newQuote: Quote = this.crudService.getSavedQuotes();
    if(newQuote && newQuote.author && newQuote.content){
      this.crudService.editQuote(newQuote);     
    } 
  }
}
