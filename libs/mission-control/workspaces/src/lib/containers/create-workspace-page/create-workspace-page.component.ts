import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '@harman/mission-control/auth';
import { snapshot } from '@harman/utils';
import { WorkspaceService } from 'libs/mission-control/auth/src/lib/services/workspace.service';

@Component({
  selector: 'mc-create-workspace-page',
  templateUrl: './create-workspace-page.component.html',
  styleUrls: ['./create-workspace-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspacePageComponent {
  constructor(
    private _authStore: AuthFacade,
    private _workspaceService: WorkspaceService
  ) {}

  async createWorkspace(name: string): Promise<void> {
    const user = await snapshot(this._authStore.user$);
    const workspace = this._workspaceService.createWorkspace(name, user.id);
    const updatedUser = {
      ...user,
      currentWorkspaceId: workspace.id,
    };
    this._authStore.updateUser(updatedUser);
    this._authStore.setupWorkspace(workspace, updatedUser);
  }
}
