import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'mc-complete-email-link-sign-up',
  templateUrl: './complete-email-link-sign-up.component.html',
  styleUrls: ['./complete-email-link-sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompleteEmailLinkSignUpComponent implements OnInit {
  form: FormGroup;
  serverErrorMessage$: Observable<string>;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _authStore: AuthFacade
  ) {
    this.serverErrorMessage$ = this._authService.serverErrorMessage$;
  }

  ngOnInit(): void {
    const email = localStorage.getItem('emailForSignIn');
    this.form = this._fb.group({
      email: [email ?? '', [Validators.required, Validators.email]],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  onSubmit() {
    if (this.form.valid) {
      // this._authService.verifyEmailAndSignIn(this.email.value, location.href);
    }
  }

  googleSignUp(authProvider: 'google' | 'facebook' = 'google') {
    this._authStore.authProviderLogin(authProvider);
  }
}
