import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgMaterialModule } from '@harman/ng-material';
import { NgSharedModule } from '@harman/ng-shared';
import { TooltipModule } from 'ng2-tooltip-directive';
import { ThemeService } from '../services/theme.service';
import { AppShellComponent } from './app-shell/app-shell.component';
import { SpacesBarComponent } from './spaces-bar/spaces-bar.component';
import { UserSettingsMenuComponent } from './user-settings-menu/user-settings-menu.component';

@NgModule({
  imports: [
    CommonModule,
    NgSharedModule,
    NgMaterialModule,
    RouterModule,
    TooltipModule,
  ],
  declarations: [
    SpacesBarComponent,
    AppShellComponent,
    UserSettingsMenuComponent,
  ],
  exports: [SpacesBarComponent, AppShellComponent, UserSettingsMenuComponent],
  providers: [ThemeService],
})
export class ComponentsModule {}
