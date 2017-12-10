import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyService } from "./app.myservice";
import { tick } from "@angular/core/testing";
import { fakeAsync } from "@angular/core/testing";

describe('AppComponent', function () {
  let de: DebugElement;
  let el: HTMLElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let myService: MyService;
  let testValue = "TESTVAL";
  let spy: jasmine.Spy;
  

  beforeEach((() => {
    
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      providers: [ MyService ]
    });

    fixture = TestBed.createComponent(AppComponent);
    comp    = fixture.componentInstance;
    
    myService = fixture.debugElement.injector.get(MyService);
    spy = spyOn(myService, 'getUsername').and.returnValue(Promise.resolve(testValue));

    de = fixture.debugElement.query(By.css('h2'));
    el = de.nativeElement;

  }));

  it('should now check the spy', () => {
    expect(el.textContent).toBe('', 'nothing displayed');
    expect(spy.calls.any()).toBe(false, 'getUsername not yet called');
  });

  it('should not update username yet', () => {
    fixture.detectChanges();
    // getUsername is async => still has not returned with quote
    expect(el.textContent).toBe('empty', 'not updated yet');
    expect(spy.calls.any()).toBe(true, 'getUsername called');
  });

  it('should now update username', fakeAsync(() => {
    fixture.detectChanges();
    tick();                  // wait for async getQuote
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testValue);
  }));
});
