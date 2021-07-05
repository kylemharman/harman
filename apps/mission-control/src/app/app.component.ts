import { Component } from '@angular/core';

@Component({
  selector: 'harman-root',
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      .mc-theme--wrapper {
        height: 100%;
      }
    `,
  ],
})
export class AppComponent {
  title = 'mission-control';

  constructor() {}
}
