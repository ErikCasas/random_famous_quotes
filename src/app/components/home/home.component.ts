import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  textWelcome = ['Hello World!', 'Welcome to Random Quotes', 'Let´s start.'];
  textColor = ['tomato', '#eeff41', 'darkorange']; 

  constructor( private router: Router,) { }

  ngOnInit(): void {
    this.consoleText(this.textWelcome, 'text', this.textColor);
  }

  /* *** START FN ANIMATION TEXT *** */
  consoleText(words: string[], id: string, colors: string[] = ['#fff']): void {
    let visible = true;
    const con = document.getElementById('console')!;
    let letterCount = 1;
    let x = 1;
    let waiting = false;
    const target = document.getElementById(id)!;
    target.setAttribute('style', `color:${colors[0]}`);
  
    setInterval(() => {
      if (letterCount === 0 && !waiting) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        setTimeout(() => {
          const usedColor = colors.shift()!;
          colors.push(usedColor);
          const usedWord = words.shift()!;
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', `color:${colors[0]}`);
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && !waiting) {
        waiting = true;
        setTimeout(() => {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (!waiting) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);
  
    setInterval(() => {
      if (visible) {
        con.className = 'console-underscore hidden';
        visible = false;
      } else {
        con.className = 'console-underscore';
        visible = true;
      }
    }, 400);
  }
  /* *** END FN ANIMATION TEXT *** */
  
  redirectQuotesView(){
    this.router.navigate(['quotesView'])
  }
}
