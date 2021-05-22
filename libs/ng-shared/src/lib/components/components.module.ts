import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { CloseButtonComponent } from './buttons/close-button/close-button.component';
import { MainButtonComponent } from './buttons/main-button/main-button.component';
import { DateSelectorComponent } from './date-selector/date-selector.component';
import { TimeSelectorComponent } from './time-selector/time-selector.component';
import { ToggleComponent } from './toggle/toggle.component';
import { WordDividerComponent } from './word-divider/word-divider.component';
import { LayoutModule } from '@angular/cdk/layout';
import { NgMaterialModule } from '@harman/ng-material';
import { ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'ngx-moment';

@NgModule({
  imports: [
    CommonModule,
    LayoutModule,
    NgMaterialModule,
    ReactiveFormsModule,
    MomentModule,
  ],
  declarations: [
    AvatarComponent,
    CloseButtonComponent,
    MainButtonComponent,
    DateSelectorComponent,
    TimeSelectorComponent,
    ToggleComponent,
    WordDividerComponent,
  ],
  exports: [
    AvatarComponent,
    CloseButtonComponent,
    MainButtonComponent,
    DateSelectorComponent,
    TimeSelectorComponent,
    ToggleComponent,
    WordDividerComponent,
  ],
  providers: [],
})
export class ComponentsModule {}
