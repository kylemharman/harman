import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompleteEmailLinkSignUpComponent } from './components/complete-email-link-sign-up/complete-email-link-sign-up.component';
import { ForgotPasswordComponent } from './containers/forgot-password/forgot-password.component';
import { LoginComponent } from './containers/login/login.component';
import { SignUpComponent } from './containers/sign-up/sign-up.component';
import { VerifyEmailComponent } from './containers/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
  },
  {
    path: 'complete-signup',
    component: CompleteEmailLinkSignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MissionControlAuthRoutingModule {}
