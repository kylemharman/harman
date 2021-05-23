import { Component } from '@angular/core';
import { ThemeService } from '@harman/mission-control/shared';

@Component({
  selector: 'harman-root',
  template: `
    <div [class]="theme.currentTheme$ | async" class="mc-theme--wrapper">
      <router-outlet></router-outlet>
    </div>
  `,
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

  constructor(public theme: ThemeService) {}
}
