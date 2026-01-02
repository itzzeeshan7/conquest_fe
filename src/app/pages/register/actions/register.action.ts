import { Action } from '@ngrx/store';
import { RegisterUser } from '@app/pages/register/models/register-user.model';
import { Params } from '@angular/router';
import { ResetPassword } from '@app/pages/register/models/reset-password.model';

export enum RegisterActionTypes {
  Register = '[Register] Register action',
  RegisterSuccess = '[Register] Register success action',
  RegisterFailture = '[Register] Register failture action',

  ActivationEmail = '[ActivationEmail] Activation Email action',
  ActivationEmailSuccess = '[ActivationEmail] Activation Email success action',
  ActivationEmailFailture = '[ActivationEmail] Activation Email failture action',

  RequestResetPassword = '[RequestResetPassword] Request Reset Password action',
  RequestResetPasswordSuccess = '[RequestResetPassword] Request Reset Password success action',
  RequestResetPasswordFailture = '[RequestResetPassword] Request Reset Password failture action',

  ResetPassword = '[ResetPassword] Reset password action',
  ResetPasswordSuccess = '[ResetPassword] Reset password success action',
  ResetPasswordFailture = '[ResetPassword] Reset password failture action',

  ResetState = '[ResetState] Reset state action',
}

export class RegisterAction implements Action {
  public readonly type = RegisterActionTypes.Register;

  constructor(public user: RegisterUser) {}
}

export class RegisterSuccessAction implements Action {
  public readonly type = RegisterActionTypes.RegisterSuccess;
}

export class RegisterFailtureAction implements Action {
  public readonly type = RegisterActionTypes.RegisterFailture;

  constructor(public error: any) {}
}

export class ActivationEmailAction implements Action {
  public readonly type = RegisterActionTypes.ActivationEmail;

  constructor(public code: Params) {}
}

export class ActivationEmailSuccessAction implements Action {
  public readonly type = RegisterActionTypes.ActivationEmailSuccess;
}

export class ActivationEmailFailtureAction implements Action {
  public readonly type = RegisterActionTypes.ActivationEmailFailture;

  constructor(public error: any) {}
}

export class RequestResetPasswordAction implements Action {
  public readonly type = RegisterActionTypes.RequestResetPassword;

  constructor(public email: string) {}
}

export class RequestResetPasswordActionSuccess implements Action {
  public readonly type = RegisterActionTypes.RequestResetPasswordSuccess;
}

export class RequestResetPasswordActionFailture implements Action {
  public readonly type = RegisterActionTypes.RequestResetPasswordFailture;

  constructor(public error: any) {}
}

export class ResetPasswordAction implements Action {
  public readonly type = RegisterActionTypes.ResetPassword;

  constructor(public reset: ResetPassword) {}
}

export class ResetPasswordSuccessAction implements Action {
  public readonly type = RegisterActionTypes.ResetPasswordSuccess;
}

export class ResetPasswordFailtureAction implements Action {
  public readonly type = RegisterActionTypes.ResetPasswordFailture;

  constructor(public error: any) {}
}

export class ResetStateAction implements Action {
  public readonly type = RegisterActionTypes.ResetState;
}

export type RegisteredAction =
  | RegisterAction
  | RegisterSuccessAction
  | RegisterFailtureAction
  | ActivationEmailAction
  | ActivationEmailSuccessAction
  | ActivationEmailFailtureAction
  | RequestResetPasswordAction
  | RequestResetPasswordActionSuccess
  | RequestResetPasswordActionFailture
  | ResetPasswordAction
  | ResetPasswordSuccessAction
  | ResetPasswordFailtureAction
  | ResetStateAction;
