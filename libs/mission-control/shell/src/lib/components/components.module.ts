import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '@harman/ng-material';
import { SpacesBarComponent } from './spaces-bar/spaces-bar.component';
import { MissionControlSettingsModule } from '@harman/mission-control/settings';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    NgMaterialModule,
    MissionControlSettingsModule,
  ],
  declarations: [SpacesBarComponent],
  exports: [SpacesBarComponent],
})
export class ComponentsModule {}
