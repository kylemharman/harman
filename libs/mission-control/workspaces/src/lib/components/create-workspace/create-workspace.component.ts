import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-create-workspace',
  templateUrl: './create-workspace.component.html',
  styleUrls: ['./create-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateWorkspaceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
