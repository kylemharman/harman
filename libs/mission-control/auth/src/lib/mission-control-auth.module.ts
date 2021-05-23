import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMaterialModule } from '@harman/ng-material';
import { NgSharedModule } from '@harman/ng-shared';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AuthFormContainerComponent } from './components/auth-form-container/auth-form-container.component';
import { AuthPageContainerComponent } from './components/auth-page-container/auth-page-container.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component';
import { MissionControlAuthRoutingModule } from './mission-control-auth-routing.module';
import { AuthEffects } from './store/effects/auth.effects';
import * as fromAuth from './store/reducers';

@NgModule({
  imports: [
    CommonModule,
    NgMaterialModule,
    MissionControlAuthRoutingModule,
    NgSharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  declarations: [
    ForgotPasswordComponent,
    LoginComponent,
    SignUpComponent,
    VerifyEmailComponent,
    AuthFormContainerComponent,
    AuthPageContainerComponent,
  ],
})
export class MissionControlAuthModule {}
