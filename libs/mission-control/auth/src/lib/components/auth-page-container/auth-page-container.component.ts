import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'mc-auth-page-container',
  templateUrl: './auth-page-container.component.html',
  styleUrls: ['./auth-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthPageContainerComponent {
  @Input() login = true;
}
