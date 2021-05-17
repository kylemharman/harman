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
  selector: 'mc-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  serverErrorMessage$: Observable<string>;

  constructor(
    public auth: AuthService,
    private _fb: FormBuilder,
    private _authStore: AuthFacade
  ) {
    this.serverErrorMessage$ = this.auth.serverErrorMessage$;
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  async onSubmit(): Promise<void> {
    this._authStore.forgotPassword(this.email.value);
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
}
