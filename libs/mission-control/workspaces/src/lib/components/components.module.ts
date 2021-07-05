import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateWorkspaceComponent } from './create-workspace/create-workspace.component';

@NgModule({
  imports: [CommonModule],
  declarations: [CreateWorkspaceComponent],
  exports: [CreateWorkspaceComponent],
})
export class ComponentsModule {}
