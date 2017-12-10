import { Component } from '@angular/core';
import { MyService } from "./app.myservice";

@Component({
  selector: 'my-app',
  template: `<h1>Hello {{name}}</h1><h2>{{welcome}}</h2>`,
  providers: [MyService],
})
export class AppComponent  { 
  name = 'Angular'; 
  welcome = 'empty';
  constructor(private myService: MyService) { }

  ngOnInit(): void {
    this.myService.getUsername().then(username => this.welcome = username);;
  }
}
