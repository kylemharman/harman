import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '@harman/mission-control/auth';

@Component({
  selector: 'mc-spaces-bar',
  templateUrl: './spaces-bar.component.html',
  styleUrls: ['./spaces-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpacesBarComponent {
  user$ = this._authStore.user$;

  constructor(private _authStore: AuthFacade) {}
}
