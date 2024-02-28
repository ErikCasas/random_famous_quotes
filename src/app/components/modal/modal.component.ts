import { Component,  Output, EventEmitter } from '@angular/core';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @Output() newQuoteAdded: EventEmitter<void> = new EventEmitter<void>();

  createQuote = {
    author: '',
    content: '',
    tag: ''
  };

  constructor(private crudService: CrudQuotesService) {}

  saveQuote(){
    const newQuote = {
      author: this.createQuote.author,
      content: this.createQuote.content,
      tag: this.createQuote.tag
    }
    console.log(newQuote);

    this.crudService.addNewQuote(newQuote);
    
    this.closeModal.emit();
    this.newQuoteAdded.emit();
  }

}
