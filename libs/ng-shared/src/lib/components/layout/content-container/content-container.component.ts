import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'mc-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentContainerComponent {
  @Input() title?: string;
}
