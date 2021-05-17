import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'mc-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Output() onClick = new EventEmitter<void>();

  public get classes(): string[] {
    return [`mc-close-button-${this.size}`];
  }
}
