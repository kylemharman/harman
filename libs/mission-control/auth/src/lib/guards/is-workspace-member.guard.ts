import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class IsWorkspaceMemberGuard implements CanActivate {
  constructor(private _auth: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot
  ): Observable<boolean> {
    return this._auth.getAuthState$().pipe(
      take(1),
      switchMap((user) => this._auth.getUser$(user.uid)),
      map((user) => {
        return user.currentWorkspaceId === route.params.id;
      }),
      tap((isWorkspaceUser) => {
        if (!isWorkspaceUser) {
          console.log('access denied');
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
