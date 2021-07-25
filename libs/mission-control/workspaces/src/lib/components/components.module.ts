import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '@harman/ng-material';
import { NgSharedModule } from '@harman/ng-shared';

import { CreateWorkspaceFormComponent } from './create-workspace-form/create-workspace-form.component';
import { InviteMemberComponent } from './invite-member/invite-member.component';
import { ManageInvitesComponent } from './manage-invites/manage-invites.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgMaterialModule,
    NgSharedModule,
  ],
  declarations: [
    CreateWorkspaceFormComponent,
    InviteMemberComponent,
    ManageInvitesComponent,
  ],
  exports: [
    CreateWorkspaceFormComponent,
    InviteMemberComponent,
    ManageInvitesComponent,
  ],
})
export class ComponentsModule {}
