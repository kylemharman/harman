import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSettingsMenuComponent } from './user-settings-menu/user-settings-menu.component';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '@harman/ng-material';
import { NgSharedModule } from '@harman/ng-shared';

@NgModule({
  imports: [CommonModule, RouterModule, NgMaterialModule, NgSharedModule],
  declarations: [UserSettingsMenuComponent],
  exports: [UserSettingsMenuComponent],
})
export class ComponentsModule {}
