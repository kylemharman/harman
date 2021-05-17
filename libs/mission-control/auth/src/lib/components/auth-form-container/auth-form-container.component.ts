import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'mc-auth-form-container',
  templateUrl: './auth-form-container.component.html',
  styleUrls: ['./auth-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormContainerComponent {
  @Input() title: string;
}
