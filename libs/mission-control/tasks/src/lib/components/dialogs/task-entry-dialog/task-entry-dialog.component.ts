import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from '@harman/mission-control/core';
import { snapshot } from '@harman/utils';
import { TaskFacade } from '../../../store/facades/task.facade';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
  selector: 'mc-task-entry-dialog',
  template: ``,
})
export class TaskEntryDialogComponent {
  constructor(
    private _dialog: MatDialog,
    private _taskStore: TaskFacade,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.openTaskDialog();
  }

  async openTaskDialog(): Promise<void> {
    const task = await snapshot(this._taskStore.task$);
    const data: ITask = await this._dialog
      .open(TaskDialogComponent, {
        height: '100%',
        width: '100%',
        maxWidth: '95vw',
        maxHeight: '90vh',
        autoFocus: false,
        data: task,
      })
      .afterClosed()
      .toPromise();

    if (!data) {
      await this._navigateBack();
      return;
    }

    this._taskStore.updateTask({
      id: task.id,
      changes: data,
    });

    await this._navigateBack();
  }

  private async _navigateBack(): Promise<void> {
    await this._router.navigate(['../'], { relativeTo: this._route });
  }
}
