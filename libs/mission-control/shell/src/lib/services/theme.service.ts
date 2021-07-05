import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject('light-theme');
  currentTheme$: Observable<string> = this.currentThemeSubject.asObservable();

  constructor() {}

  changeTheme(theme: string): void {
    this.currentThemeSubject.next(theme);
  }
}
