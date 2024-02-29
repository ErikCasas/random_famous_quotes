import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySearchComponent } from './empty-search.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmptySearchComponent', () => {
  let component: EmptySearchComponent;
  let fixture: ComponentFixture<EmptySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptySearchComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the error message and image', () => {
    const errorMessage = fixture.nativeElement.querySelector('.text-error');
    const errorImage = fixture.nativeElement.querySelector('.icon-error');

    expect(errorMessage.textContent).toContain("We can't find quotes with that category :c");
    expect(errorImage).toBeTruthy();
  });
});
