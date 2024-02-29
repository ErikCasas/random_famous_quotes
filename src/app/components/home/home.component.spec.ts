import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { HomeComponent } from './home.component';
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
      declarations: [ HomeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [BrowserAnimationsModule, BrowserDynamicTestingModule, RouterTestingModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('fn onInit', ()=>{
    const spyConsoleText = spyOn(component, 'consoleText')

    component.ngOnInit();

    expect(spyConsoleText).toHaveBeenCalled();
  });

  it('fn redirectQuotesView', () =>{
    const navigateSpy = spyOn(router, 'navigate').and.returnValue(Promise.resolve(true));
    const setItemSpy = spyOn(localStorage, 'setItem');

    component.redirectQuotesView();

    expect(navigateSpy).toHaveBeenCalledWith(['quotesView']);
    expect(setItemSpy).toHaveBeenCalledWith('showIconBack', 'true');
  });
  
});
