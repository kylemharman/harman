import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import { first, last } from 'lodash';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthFacade } from '@harman/mission-control/auth';

@Component({
  selector: 'ha-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() diameter = 32;
  userInitials$: Observable<string>;
  userProfileImage$: Observable<string>;

  constructor(private _authStore: AuthFacade) {
    this.userInitials$ = this._authStore.user$.pipe(
      map((user) => {
        if (!user) {
          return;
        }
        return this._getInitials(user.displayName);
      })
    );
    this.userProfileImage$ = this._authStore.user$.pipe(
      map((user) => {
        if (!user) {
          return;
        }
        return user.profileImage;
      })
    );
  }

  @HostBinding('style.width')
  @HostBinding('style.height')
  get size(): string {
    return `${this.diameter}px`;
  }

  private _getInitials(name: string): string {
    const initials: RegExpMatchArray = name.match(/\b(\w)/g) || [];

    if (initials.length > 1) {
      return `${first(initials)}${last(initials)}`.toUpperCase();
    }

    return initials.join('').toUpperCase();
  }
}
