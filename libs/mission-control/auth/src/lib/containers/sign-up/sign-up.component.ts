import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { AuthFacade } from '../../store/facades/auth.facade';

@Component({
  selector: 'mc-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent implements OnInit {
  form: FormGroup;
  passwordHidden = true;
  serverErrorMessage$: Observable<string>;

  constructor(
    private _authService: AuthService,
    private _fb: FormBuilder,
    private _authStore: AuthFacade
  ) {
    this.serverErrorMessage$ = this._authService.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      fullname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get fullname(): AbstractControl {
    return this.form.get('fullname');
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }

  get password(): AbstractControl {
    return this.form.get('password');
  }

  onSubmit() {
    if (this.form.valid) {
      this._authStore.signUp(
        this.fullname.value,
        this.email.value,
        this.password.value
      );
    }
  }

  googleSignUp(authProvider: 'google' | 'facebook' = 'google') {
    this._authStore.authProviderLogin(authProvider);
  }
}
