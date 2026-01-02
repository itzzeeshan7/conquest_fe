import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationService } from '@app/pages/auth';
import { Action, Store } from '@ngrx/store';
import { State } from '@app/pages/auth/actions/reducer/auth.reducers';
import {
  AuthActionTypes,
  LoadUserAction,
  LoadUserFailureAction,
  LoadUserSuccessAction,
  LogInAction,
  LogInFailureAction,
  LogInSuccessAction,
  LogOutAction,
  LogOutFailureAction,
  LogOutSuccessAction,
} from '@app/pages/auth/actions/auth.action';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable()
export class AuthEffects {
  logIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LogIn),
      switchMap((action: LogInAction) => {
        return this.authenticationService.login(action.auth).pipe(
          map(() => new LogInSuccessAction()),
          catchError((err) => {
            return of(new LogInFailureAction(err));
          }),
        );
      }),
    ),
  );

  loadUser = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.LoadUser),
      concatMap((action: LoadUserAction) =>
        this.authenticationService.loadToken().pipe(
          map((authToken) => {
            if (authToken.token) {
              return new LoadUserSuccessAction();
            } else {
              return new LoadUserFailureAction();
            }
          }),
          catchError((err) => {
            return of(new LoadUserFailureAction());
          }),
        ),
      ),
    ),
  );

  logout = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActionTypes.Logout),
      concatMap((action: LogOutAction) =>
        this.authenticationService.logout().pipe(
          map((res) => {
            if (res) {
              return new LogOutSuccessAction();
            }
          }),
          catchError((err) => of(new LogOutFailureAction(err))),
        ),
      ),
    ),
  );

  constructor(
    private actions: Actions,
    private authenticationService: AuthenticationService,
    private store: Store<State>,
  ) {}
}
