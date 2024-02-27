import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-quotes',
  templateUrl: './card-quotes.component.html',
  styleUrls: ['./card-quotes.component.scss']
})
export class CardQuotesComponent implements OnInit {

  @Input() quotes: any;

  ngOnInit(): void {

  }
}
