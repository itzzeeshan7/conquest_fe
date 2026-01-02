import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';
import { State } from '@app/pages/register/actions/reducer/register.reducers';
import {
  ActivationEmailAction,
  ActivationEmailFailtureAction,
  ActivationEmailSuccessAction,
  RegisterAction,
  RegisterActionTypes,
  RegisterFailtureAction,
  RegisterSuccessAction,
  RequestResetPasswordAction,
  RequestResetPasswordActionFailture,
  RequestResetPasswordActionSuccess,
  ResetPasswordAction,
  ResetPasswordFailtureAction,
  ResetPasswordSuccessAction,
} from '@app/pages/register/actions/register.action';
import { RegisterService } from '@app/pages/register/services/register.service';

@Injectable()
export class RegisterEffects {
  register = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterActionTypes.Register),
      switchMap((action: RegisterAction) => {
        new RegisterFailtureAction('');
        return this.registerService.register(action.user).pipe(
          map(() => new RegisterSuccessAction()),
          catchError((error) => of(new RegisterFailtureAction(error.error))),
        );
      }),
    ),
  );

  activatedEmail = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterActionTypes.ActivationEmail),
      switchMap((action: ActivationEmailAction) => {
        return this.registerService.activatedEmail(action.code).pipe(
          map(() => new ActivationEmailSuccessAction()),
          catchError((err) => of(new ActivationEmailFailtureAction(err))),
        );
      }),
    ),
  );

  requestResetPassword = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterActionTypes.RequestResetPassword),
      switchMap((action: RequestResetPasswordAction) => {
        return this.registerService.requestResetPassword(action.email).pipe(
          map(() => new RequestResetPasswordActionSuccess()),
          catchError((err) => of(new RequestResetPasswordActionFailture(err))),
        );
      }),
    ),
  );

  resetPassword = createEffect(() =>
    this.actions.pipe(
      ofType(RegisterActionTypes.ResetPassword),
      switchMap((action: ResetPasswordAction) => {
        return this.registerService.resetPassword(action.reset).pipe(
          map(() => new ResetPasswordSuccessAction()),
          catchError((err) => of(new ResetPasswordFailtureAction(err))),
        );
      }),
    ),
  );

  constructor(
    private actions: Actions,
    private registerService: RegisterService,
    private store: Store<State>,
  ) {}
}
