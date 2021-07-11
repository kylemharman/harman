import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthFacade } from '@harman/mission-control/auth';
import { snapshot } from '@harman/utils';
import { WorkspaceService } from 'libs/mission-control/auth/src/lib/services/workspace.service';

@Component({
  selector: 'mc-create-workspace-form',
  templateUrl: './create-workspace-form.component.html',
  styleUrls: ['./create-workspace-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspaceFormComponent implements OnInit {
  form: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authStore: AuthFacade,
    private _workspaceService: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
    });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      const user = await snapshot(this._authStore.user$);
      const workspace = this._workspaceService.createWorkspace(
        this.name.value,
        user
      );
      this._authStore.setupWorkspace(workspace, user);
      this._authStore.updateUserCurrentWorkspace({
        ...user,
        currentWorkspaceId: workspace.id,
      });
    }
  }
}
