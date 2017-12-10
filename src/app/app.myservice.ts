import { Injectable } from '@angular/core';

@Injectable()
export class MyService {
    username = "myName";
    loggedIn = false;

    constructor() { };

    getUsername() : Promise<string> {
    return new Promise(resolve => {
      setTimeout( () => resolve(this.username), 500 );
    })};

    isLoggedIn() {
        return this.loggedIn;
    }

}