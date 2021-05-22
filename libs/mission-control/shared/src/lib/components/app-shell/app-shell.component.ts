import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mc-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  constructor() {}
}
