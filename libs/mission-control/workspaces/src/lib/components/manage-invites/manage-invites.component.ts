import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '@harman/mission-control/auth';

@Component({
  selector: 'mc-manage-invites',
  templateUrl: './manage-invites.component.html',
  styleUrls: ['./manage-invites.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManageInvitesComponent {
  user$ = this._auth.user$;
  invites$ = this._auth.invites$;

  constructor(private _auth: AuthFacade) {}

  joinWorkspace(workspaceId: string): void {}
  createWorkspace(): void {}
}
