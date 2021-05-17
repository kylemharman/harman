import { ChangeDetectionStrategy, Component } from '@angular/core';
import { snapshot } from '@harman/utils';

import { AuthService } from '../../services/auth.service';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'mc-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerifyEmailComponent {
  user$ = this._authStore.user$;

  constructor(
    private _authStore: AuthFacade,
    private _authService: AuthService
  ) {}

  async sendVerificationEmail(): Promise<void> {
    const user = await snapshot(this._authService.firebaseAuthUser$);
    this._authStore.sendVerificationEmailMail(user);
  }
}
