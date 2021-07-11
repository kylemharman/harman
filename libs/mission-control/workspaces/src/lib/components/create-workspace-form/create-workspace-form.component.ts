import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'mc-create-workspace-form',
  templateUrl: './create-workspace-form.component.html',
  styleUrls: ['./create-workspace-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateWorkspaceFormComponent implements OnInit {
  form: FormGroup;
  @Output() workspaceName = new EventEmitter<string>();

  constructor(private _fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      name: ['', [Validators.required]],
    });
  }

  get name(): AbstractControl {
    return this.form.get('name');
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      this.workspaceName.emit(this.name.value);
    }
  }
}
