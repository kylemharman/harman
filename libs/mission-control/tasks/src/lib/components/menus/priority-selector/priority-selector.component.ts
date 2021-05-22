import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { TaskPriority } from '@harman/mission-control/core';
import { capitalize } from 'lodash';

enum FlagIcon {
  Outline = 'outlined_flag',
  Filled = 'flag',
}

@Component({
  selector: 'mc-priority-selector',
  templateUrl: './priority-selector.component.html',
  styleUrls: ['./priority-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrioritySelectorComponent {
  @Input() priority: TaskPriority;
  @Input() size: 'small' | 'large' = 'small';
  @Output() priorityChange = new EventEmitter<TaskPriority>();
  taskPriority = TaskPriority;
  tooltip: string;
  flagIcon: FlagIcon;
  outline: string = '';

  ngOnInit(): void {
    if (this.priority === TaskPriority.None) {
      this.tooltip = 'Set Priority';
      this.flagIcon = FlagIcon.Outline;
      this.outline = 'hover';
    } else {
      this.tooltip = `${capitalize(this.priority)} Priority`;
      this.flagIcon = FlagIcon.Filled;
    }
  }
}
