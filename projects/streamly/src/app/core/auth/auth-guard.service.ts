import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { switchMap } from 'rxjs/operators';
import { AppState } from '../core.state';
import { selectIsAuthenticated } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private store: Store<AppState>) {}

  canActivate(): Observable<boolean> {
    return this.store.pipe(
      select(selectIsAuthenticated),
      switchMap(async (authenticated) => {
        // https://github.com/angular/angular/issues/16211#issuecomment-296526518
        if (!authenticated) {
          await this.router.navigate(['']);
          return false;
        }

        return true;
      })
    );
  }
}
