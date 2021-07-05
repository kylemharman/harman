import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'mc-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  constructor(public theme: ThemeService) {}
}
