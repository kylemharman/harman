import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '@harman/mission-control/auth';
import { WorkspaceService } from 'libs/mission-control/auth/src/lib/services/workspace.service';

enum Roles {
  Admin = 'Admin',
  Member = 'Member',
  Owner = 'Owner',
}

export interface IMemberRoles {
  type: Roles;
}

@Component({
  selector: 'mc-invite-member',
  templateUrl: './invite-member.component.html',
  styleUrls: ['./invite-member.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteMemberComponent implements OnInit {
  form: FormGroup;
  roles: IMemberRoles[] = [{ type: Roles.Member }, { type: Roles.Admin }];

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _workspace: WorkspaceService
  ) {}

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      role: [Roles.Member, Validators.required],
    });
  }

  get email(): AbstractControl {
    return this.form.get('email');
  }
  get role(): AbstractControl {
    return this.form.get('role');
  }

  onSubmit() {
    if (this.form.valid) {
      // this._auth.inviteMember(this.email.value);
      this._workspace.saveMemberInvite(this.email.value, this.role.value);
    }
  }
}
