import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { AuthFacade } from '@harman/mission-control/auth';
import { ThemeService } from '@harman/mission-control/shared';

@Component({
  selector: 'mc-user-settings-menu',
  templateUrl: './user-settings-menu.component.html',
  styleUrls: ['./user-settings-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsMenuComponent {
  user$ = this._authStore.user$;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  constructor(private _authStore: AuthFacade, private _theme: ThemeService) {}

  closeMenu(): void {
    this.trigger.closeMenu();
  }

  logout(): void {
    this._authStore.logout();
  }

  darkMode(value: boolean): void {
    if (value) {
      return this._theme.changeTheme('dark-theme');
    }

    return this._theme.changeTheme('light-theme');
  }
}
