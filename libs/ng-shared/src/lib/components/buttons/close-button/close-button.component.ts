import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'ha-close-button',
  templateUrl: './close-button.component.html',
  styleUrls: ['./close-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CloseButtonComponent {
  @Input() size: 'small' | 'medium' | 'large' = 'small';
  @Output() onClick = new EventEmitter<MouseEvent>();

  public get classes(): string[] {
    return [`ha-close-button-${this.size}`];
  }
}
