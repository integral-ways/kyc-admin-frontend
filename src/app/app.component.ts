import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-notification></app-notification>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'KYC Admin Portal';
}
