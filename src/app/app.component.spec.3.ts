import { AppComponent } from './app.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MyService } from "./app.myservice";

describe('AppComponent', function () {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let myService: MyService;
  let myServiceStub = {
      isLoggedIn: true,
      username: { name: 'other user'}
    };

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      // providers:    [ MyService ]
      providers: [ {provide: MyService, useValue: myServiceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('h1'));
    myService = TestBed.get(MyService);
  });

  it('Will now mock the service', () => {
    fixture.detectChanges();
    expect(myService.isLoggedIn).toBe(true);
    myServiceStub.isLoggedIn = false;
    expect(myService.isLoggedIn).toBe(true);
  });
});
