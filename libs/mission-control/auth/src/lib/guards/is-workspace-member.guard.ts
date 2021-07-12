import { Injectable } from '@angular/core';
import { AuthFacade } from '../store/facades/auth.facade';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(private _auth: AuthFacade, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._auth.user$.pipe(
      take(1),
      map((user) => user.currentWorkspaceId === route.params.id),
      tap((isWorkspaceMember) => {
        if (!isWorkspaceMember) {
          console.log('user does not have access to this workspace!');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
