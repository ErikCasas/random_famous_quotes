import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let crudService: CrudQuotesService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, BrowserDynamicTestingModule ],
      providers: [CrudQuotesService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudQuotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn closeModalQuote', () => {
    const emitSpy = spyOn(component.closeModal, 'emit');

    component.closeModalQuote();

    expect(emitSpy).toHaveBeenCalled();
  });

  it('fn saveQuote - when newQuote is empty', () => {
    const newQuote = {
      author: '',
      content: '',
      tag: '',
      icon: true,
      _id: '',
      name: '',
    };

    const spyQuoteNotEmpty = spyOn(component, 'quoteEmpty')

    component.saveQuote();
    
    expect(spyQuoteNotEmpty).toHaveBeenCalledWith(newQuote);

  });

  it('fn quoteEmpty', ()=> {
    const spyAddNewQuote = spyOn(crudService, 'addNewQuote')
    const newQuote = { author: 'Author', content: 'Content', tag: 'Tag' };
    const emitSpy = spyOn(component.newQuoteAdded, 'emit');

    component.quoteEmpty(newQuote);

    expect(spyAddNewQuote).toHaveBeenCalledWith(newQuote);
    expect(emitSpy).toHaveBeenCalled();
  })

  /*  test the saveQuote and quoteNotEmpty functions, it causes a full page reload! */

});
