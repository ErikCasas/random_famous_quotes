import { Component,  Output, EventEmitter } from '@angular/core';
import { Quote } from 'src/app/interfaces';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() newQuoteAdded: EventEmitter<any> = new EventEmitter<any>();
  @Output() editQuote: EventEmitter<any> = new EventEmitter<any>();

  createQuote = {
    author: '',
    content: '',
    tag: ''
  };

  showIcons: boolean = false;

  constructor(private crudService: CrudQuotesService) {}

  closeModalQuote(){
    this.closeModal.emit();
  }

  saveQuote(): void {
    const newQuote = {
      author: this.createQuote.author,
      content: this.createQuote.content,
      tag: this.createQuote.tag,
      icon: true,
      _id: '',
      name: ''
    };
  
    if (newQuote && newQuote.author !== '') {
      this.quoteNotEmpty(newQuote)
    } else {
      this.quoteEmpty(newQuote)
    }
    this.closeModal.emit();
  }

  quoteNotEmpty(newQuote: Quote){
    this.crudService.editQuote(newQuote);
    this.editQuote.emit(newQuote);
    location.reload();
  }

  quoteEmpty(newQuote: any){
    this.crudService.addNewQuote(newQuote);
    this.newQuoteAdded.emit(newQuote);
  }

}
