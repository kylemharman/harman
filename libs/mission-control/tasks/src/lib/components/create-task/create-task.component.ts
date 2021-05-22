import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mc-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateTaskComponent {
  name = new FormControl('');
  @Output() taskName = new EventEmitter<string>();

  taskNameSubmit(): void {
    this.taskName.emit(this.name.value);
    this.name.reset();
  }
}
