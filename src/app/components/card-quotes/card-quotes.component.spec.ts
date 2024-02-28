import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuotesComponent } from './card-quotes.component';

describe('CardQuotesComponent', () => {
  let component: CardQuotesComponent;
  let fixture: ComponentFixture<CardQuotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardQuotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardQuotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
