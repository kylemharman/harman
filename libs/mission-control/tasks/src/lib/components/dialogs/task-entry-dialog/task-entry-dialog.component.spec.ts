import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskEntryDialogComponent } from './task-entry-dialog.component';

describe('TaskEntryDialogComponent', () => {
  let component: TaskEntryDialogComponent;
  let fixture: ComponentFixture<TaskEntryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskEntryDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
