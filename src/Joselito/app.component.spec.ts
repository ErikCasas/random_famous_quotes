import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from 'src/app/components/home/home.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn onInit', () => {
    const spyConsoleText = spyOn(component, 'consoleText');

    component.ngOnInit();

    expect(spyConsoleText).toHaveBeenCalled();
  });

  it('fn redirectQuotesView', () => {
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(
      Promise.resolve(true)
    );
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.redirectQuotesView();

    expect(navigateSpy).toHaveBeenCalledWith(['quotesView']);
    expect(setItemSpy).toHaveBeenCalledWith('showIconBack', 'true');
  });
});

// import { TestBed, ComponentFixture } from '@angular/core/testing';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'random_quotes'`, () => {
    expect(component.title).toEqual('random_quotes');
  });

  it('should render app-header', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-header')).toBeTruthy();
  });

  it('should render router-outlet', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('router-outlet')).toBeTruthy();
  });
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardQuotesComponent } from 'src/app/components/card-quotes/card-quotes.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
import { Quote } from 'src/app/interfaces';

describe('CardQuotesComponent', () => {
  let component: CardQuotesComponent;
  let fixture: ComponentFixture<CardQuotesComponent>;
  let crudService: CrudQuotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardQuotesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [CrudQuotesService],
    }).compileComponents();

    fixture = TestBed.createComponent(CardQuotesComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudQuotesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn ngOnInit', () => {
    const getSavedQuotes = spyOn(crudService, 'getSavedQuotes');

    component.ngOnInit();

    expect(getSavedQuotes).toHaveBeenCalled();
  });

  it('fn closeModal', () => {
    expect(component.createQuote).toBeFalsy();
  });

  it('fn openModal', () => {
    const deleteSpy = spyOn(crudService, 'deleteQuote');

    component.openModal();

    expect(deleteSpy).toHaveBeenCalled();
    expect(component.createQuote).toBeTruthy();
  });

  it('fn deleteQuote', () => {
    const emitSpy = spyOn(component.newQuoteDeleted, 'emit');
    const deleteSpy = spyOn(crudService, 'deleteQuote');

    component.deleteQuote();

    expect(emitSpy).toHaveBeenCalled();
    expect(deleteSpy).toHaveBeenCalled();
  });

  it('fn editQuote - when quote is not empty', () => {
    const mockQuote: Quote = {
      _id: 'scBvf0Y5W3B',
      name: '',
      author: '',
      content:
        "To me, it doesn't matter how good you are. Sport is all about playing and competing. Whatever you do in cricket and in sport, enjoy it, be positive and try to win.",
      authorSlug: 'ian-botham',
      length: 163,
      dateAdded: '2022-07-06',
      dateModified: '2023-04-14',
    };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockQuote);
    const editQuoteSpy = spyOn(crudService, 'editQuote');

    component.editQuote();

    expect(editQuoteSpy).not.toHaveBeenCalled();
  });
});

//  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptySearchComponent } from 'src/app/components/empty-search/empty-search.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('EmptySearchComponent', () => {
  let component: EmptySearchComponent;
  let fixture: ComponentFixture<EmptySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptySearchComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

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

    expect(errorMessage.textContent).toContain(
      "We can't find quotes with that category :c"
    );
    expect(errorImage).toBeTruthy();
  });
});

//  import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from 'src/app/components/footer/footer.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FooterComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from 'src/app/components/header/header.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn onInit', () => {
    const spyFnShowIcon = spyOn(component, 'showIcon').and.callThrough();

    component.ngOnInit();

    expect(spyFnShowIcon).toHaveBeenCalled();
  });

  it('fn Show Icon - localStorage value is true', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('true');
    spyOn(router.events, 'subscribe').and.callFake((callback: any) => {
      callback(new NavigationEnd(0, 'viewQuote', 'home'));
      return new Subscription(() => {});
    });

    component.showIcon();
    tick();

    expect(component.showIconBack).toBe(true);
  }));

  it('fn Show Icon - localStorage value is false', fakeAsync(() => {
    spyOn(localStorage, 'getItem').and.returnValue('false');
    spyOn(router.events, 'subscribe').and.callFake((callback: any) => {
      callback(new NavigationEnd(0, 'viewQuote', 'home'));
      return new Subscription(() => {});
    });

    component.showIcon();
    tick();

    expect(component.showIconBack).toBe(false);
  }));

  it('fn redirectHome', fakeAsync(() => {
    spyOn(localStorage, 'removeItem');
    spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));

    component.redirectHome();

    expect(localStorage.removeItem).toHaveBeenCalledWith('showIconBack');
    expect(router.navigate).toHaveBeenCalledWith(['home']);

    tick();
  }));
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from 'src/app/components/modal/modal.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
// import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
// import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Location } from '@angular/common';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;
  let crudService: CrudQuotesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, BrowserDynamicTestingModule],
      providers: [CrudQuotesService],
    }).compileComponents();

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

    const spyQuoteNotEmpty = spyOn(component, 'quoteEmpty');

    component.saveQuote();

    expect(spyQuoteNotEmpty).toHaveBeenCalledWith(newQuote);
  });

  it('fn quoteEmpty', () => {
    const spyAddNewQuote = spyOn(crudService, 'addNewQuote');
    const newQuote = { author: 'Author', content: 'Content', tag: 'Tag' };
    const emitSpy = spyOn(component.newQuoteAdded, 'emit');

    component.quoteEmpty(newQuote);

    expect(spyAddNewQuote).toHaveBeenCalledWith(newQuote);
    expect(emitSpy).toHaveBeenCalled();
  });

  /*  test the saveQuote and quoteNotEmpty functions, it causes a full page reload! */
});

// import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotesViewComponent } from 'src/app/components/quotes-view/quotes-view.component';
// import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APIquotesService } from 'src/app/services/apiquotes.service';
// import { CrudQuotesService } from 'src/app/services/crud-quotes.service';
// import { Quote } from 'src/app/interfaces';

describe('QuotesViewComponent', () => {
  let component: QuotesViewComponent;
  let fixture: ComponentFixture<QuotesViewComponent>;
  let crudService: CrudQuotesService;
  const mockQuotes = [
    { author: 'Author1', content: 'Content1' },
    { author: 'Author2', content: 'Content2' },
  ];
  const mockSelectedValue = 'Tag';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuotesViewComponent],
      imports: [HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [APIquotesService, CrudQuotesService],
    }).compileComponents();

    fixture = TestBed.createComponent(QuotesViewComponent);
    component = fixture.componentInstance;
    crudService = TestBed.inject(CrudQuotesService);
    component.selectedValue = mockSelectedValue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn onInit', () => {
    const spyGetTagQuotes = spyOn(component, 'getTagQuotes');
    const spyGetCreatedQuote = spyOn(component, 'getCreatedQuote');

    component.ngOnInit();

    expect(spyGetTagQuotes).toHaveBeenCalled();
    expect(spyGetCreatedQuote).toHaveBeenCalled();
  });

  it('fn clearFilters', () => {
    component.clearFilters();

    expect(component.selectedValue).toBe(null);
    expect(component.selectedValuePerPage).toBe(null);
    expect(component.quotes).toEqual([]);
    expect(component.showError).toBeFalsy();
    expect(component.showSearchIcon).toBeTruthy();
  });

  it('fn deleteCreatedNote - when quotes is not empty', () => {
    spyOn(crudService, 'deleteQuote');
    component.quotes = [{ author: 'Author', content: 'Content', tag: 'Tag' }];

    component.deleteCreatedNote();

    expect(crudService.deleteQuote).toHaveBeenCalled();
  });

  it('fn deleteCreatedNote - when quotes is empty', () => {
    component.quotes = [];

    component.deleteCreatedNote();

    expect(component.showSearchIcon).toBe(true);
  });

  it('fn closeModal', () => {
    component.closeModal();

    expect(component.createQuote).toBeFalsy();
  });

  it('fn getCreatedQuote - when new quote is valid', () => {
    const mockQuote: Quote = {
      author: 'Author',
      content: 'Content',
      _id: '',
      name: '',
    };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockQuote);

    component.getCreatedQuote();

    expect(component.showCard).toBeTrue();
    expect(component.showSearchIcon).toBeFalse();
  });

  it('fn getCreatedQuote - when new quote is invalid', () => {
    const mockInvalidQuote: Quote = {
      author: '',
      content: '',
      _id: '',
      name: '',
    };
    spyOn(crudService, 'getSavedQuotes').and.returnValue(mockInvalidQuote);

    component.getCreatedQuote();

    expect(component.showCard).toBeFalse();
    expect(component.showSearchIcon).toBeTrue();
  });

  it('fn getQuotes', () => {
    const mockQuotes = [
      { author: 'Author1', content: 'Content1', tag: '' },
      { author: 'Author2', content: 'Content2', tag: '' },
    ];

    const getCreatedQuoteSpy = spyOn(
      component,
      'getCreatedQuote'
    ).and.callThrough();

    component.getQuotes(mockQuotes);

    expect(getCreatedQuoteSpy).toHaveBeenCalled();
  });

  /*  test the getEditQuote function, it causes a full page reload! */
});

// import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';

// import { APIquotesService } from './apiquotes.service';

describe('APIquotesService', () => {
  let service: APIquotesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [APIquotesService],
    });
    service = TestBed.inject(APIquotesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTagQuotes and return data', () => {
    const mockData = [
      { id: '1', name: 'Tag1' },
      { id: '2', name: 'Tag2' },
    ];

    service.getTagQuotes().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne('https://api.quotable.io/tags');
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });

  it('should call getQuotesByTags and return data', () => {
    const mockData = [
      { author: 'Author1', content: 'Content1' },
      { author: 'Author2', content: 'Content2' },
    ];
    const tag = 'testing';
    const pageNumber = 1;

    service.getQuotesByTags(tag, pageNumber).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpTestingController.expectOne(
      `https://api.quotable.io/quotes/?tags=${tag}&page=${pageNumber}`
    );
    expect(req.request.method).toEqual('GET');

    req.flush(mockData);
  });
});

// import { TestBed } from '@angular/core/testing';

// import { CrudQuotesService } from './crud-quotes.service';
// import { Quote } from '../interfaces';

describe('CrudQuotesService', () => {
  let service: CrudQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrudQuotesService],
    });
    service = TestBed.inject(CrudQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fn addNewQuote', () => {
    const mockQuote = { author: 'Author', content: 'Content', tag: 'Tag' };

    spyOn(localStorage, 'setItem');

    service.addNewQuote(mockQuote);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'quotes',
      JSON.stringify(mockQuote)
    );
  });

  it('fn getSavedQuotes', () => {
    const mockQuote: Quote = {
      _id: '1',
      name: 'Quote Name',
      author: 'Author',
      content: 'Content',
    };
    localStorage.setItem('quotes', JSON.stringify(mockQuote));
    const savedQuote = service.getSavedQuotes();
    expect(savedQuote).toEqual(mockQuote);
  });

  it('fn addQuote', () => {
    const mockQuotes = Array.from({ length: 10 }, (_, index) => ({
      id: index,
    }));
    const newQuote = { id: 10 };
    service.addQuote(mockQuotes, newQuote);
    expect(mockQuotes.length).toBe(10);
    expect(mockQuotes).not.toContain({ id: 0 });
    expect(mockQuotes).toContain(newQuote);
  });

  it('fn deleteQuote', () => {
    localStorage.setItem(
      'quotes',
      JSON.stringify({ author: 'Author', content: 'Content', tag: 'Tag' })
    );
    service.deleteQuote();
    expect(localStorage.getItem('quotes')).toBe(null);
  });

  it('fn editQuote', () => {
    const editedQuote = {
      author: 'New Author',
      content: 'New Content',
      tag: 'New Tag',
    };
    spyOn(localStorage, 'setItem'); // Espiar el método setItem de localStorage

    service.editQuote(editedQuote);

    expect(localStorage.setItem).toHaveBeenCalledWith(
      'quotes',
      JSON.stringify(editedQuote)
    );
  });
});
