import { Component } from '@angular/core';

@Component({
  selector: 'harman-root',
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
  title = 'mission-control';

  constructor() {}
}
