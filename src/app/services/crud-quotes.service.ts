import { Injectable } from '@angular/core';
import { Quote } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class CrudQuotesService {

  constructor() { }

  addNewQuote(newQuote: any): void{
    localStorage.setItem('quotes', JSON.stringify(newQuote)); // Guardar el arreglo actualizado en localStorage
  }
  
  getSavedQuotes(): Quote {
    const quotesString = localStorage.getItem('quotes');
    return quotesString ? JSON.parse(quotesString) : []; // Devuelve el arreglo guardado o un arreglo vacío si no hay datos en localStorage
  }
  
  addQuote(quotes: any[], newQuote: any): void {
    if (quotes.length >= 10) {
      quotes.shift(); // Eliminar el primer elemento si ya hay 10
    }
    quotes.push(newQuote); // Agregar el nuevo objeto al final del arreglo
  }

  deleteQuote(){
    localStorage.removeItem('quotes');
  }

}
