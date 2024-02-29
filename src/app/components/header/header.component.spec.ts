import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule]
    })
    .compileComponents();

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
