import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'mc-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainButtonComponent {
  @Input() primary = false;
  @Input() fullWidth = false;
  @Input() label: string;
  @Input() borderColor = '#cccccc';
  @Input() type: 'submit' | 'button' = 'button';
  @Input() size: 'small' | 'medium' | 'large' = 'medium';
  @Input() icon?: string;
  @Output() onClick = new EventEmitter<void>();

  public get classes(): string[] {
    const mode = this.primary
      ? 'mc-main-button-primary'
      : 'mc-main-button-secondary';
    const fullWidth = this.fullWidth ? 'mc-main-button-fullwidth' : '';
    return ['mc-main-button', `mc-main-button-${this.size}`, mode, fullWidth];
  }
}
