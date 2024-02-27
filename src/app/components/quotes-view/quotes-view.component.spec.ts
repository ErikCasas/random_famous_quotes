import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesViewComponent } from './quotes-view.component';

describe('QuotesViewComponent', () => {
  let component: QuotesViewComponent;
  let fixture: ComponentFixture<QuotesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotesViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuotesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
