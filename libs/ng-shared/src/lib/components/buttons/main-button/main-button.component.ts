import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'ha-main-button',
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
  @Output() onClick = new EventEmitter<MouseEvent>();

  public get classes(): string[] {
    const mode = this.primary
      ? 'ha-main-button-primary'
      : 'ha-main-button-secondary';
    const fullWidth = this.fullWidth ? 'ha-main-button-fullwidth' : '';
    return ['ha-main-button', `ha-main-button-${this.size}`, mode, fullWidth];
  }
}
