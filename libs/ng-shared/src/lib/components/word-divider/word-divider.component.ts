import { Component, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
  selector: 'ha-word-divider',
  templateUrl: './word-divider.component.html',
  styleUrls: ['./word-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WordDividerComponent {
  @Input() label: string;
}
