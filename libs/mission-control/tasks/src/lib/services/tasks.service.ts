import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '@harman/mission-control/auth';
import {
  ITask,
  RootCollection,
  Task,
  WorkspaceCollection,
} from '@harman/mission-control/core';
import { FirestoreService } from '@harman/ng-shared';
import { snapshot } from '@harman/utils';
import firebase from 'firebase';
import { WorkspaceService } from 'libs/mission-control/auth/src/lib/services/workspace.service';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { TaskFacade } from '../store/facades/task.facade';

@Injectable()
export class TasksService {
  constructor(
    private _db: FirestoreService,
    private _taskStore: TaskFacade,
    private _snack: MatSnackBar,
    private _authStore: AuthFacade,
    private _workspaceService: WorkspaceService
  ) {}

  async createTask(name: string): Promise<ITask> {
    if (!name.trim().length) {
      this._snack.open('⚠️ Task name can not be empty.');
      return;
    }
    const id = this._db.generateId();
    const order = await this._getOrderNumber();
    const tasksCollection = await snapshot(this.tasksCollection$());
    const docRef = this._db.col<ITask>(tasksCollection).doc<ITask>(id);
    const member = await snapshot(this._workspaceService.member$);
    return Task.init({
      name,
      order,
      id: docRef.ref.id,
      path: docRef.ref.path,
      createdBy: {
        displayName: member.displayName,
        profileImage: member.profileImage,
        path: member.path,
      },
    });
  }

  async saveTask(task: ITask): Promise<void> {
    await this._db.set(task.path, task);
  }

  async sortTasks(tasks: Partial<ITask>[]) {
    const db = firebase.firestore();
    const batch = db.batch();
    const tasksCollection = await snapshot(this.tasksCollection$());
    const refs = tasks.map((t) => db.collection(tasksCollection).doc(t.id));
    refs.forEach((ref, i) => batch.update(ref, { order: i }));
    batch.commit();
  }

  async updateTask(taskID: string, data: Partial<ITask>): Promise<void> {
    await this._db.update(
      `${RootCollection.Workspaces}/${WorkspaceCollection.Tasks}/${taskID}`,
      data
    );
  }

  getAllTasks$(): Observable<ITask[]> {
    return this.tasksCollection$().pipe(
      switchMap((ref) =>
        this._db.col$<ITask>(ref, (doc) => doc.orderBy('order'))
      )
    );
  }

  tasksCollection$(): Observable<string> {
    return this._authStore.user$.pipe(
      map(
        (user) =>
          `${RootCollection.Workspaces}/${user.currentWorkspaceId}/${WorkspaceCollection.Tasks}`
      )
    );
  }

  private async _getOrderNumber(): Promise<number> {
    let tasksTotal = await snapshot(this._taskStore.totalTasks$);
    return tasksTotal ? tasksTotal++ : 0;
  }
}
