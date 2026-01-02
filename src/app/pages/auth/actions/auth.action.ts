import { Action } from '@ngrx/store';
import { Auth } from '../models/auth.model';

export enum AuthActionTypes {
  LogIn = '[Auth] Log in action',
  LogInSuccess = '[Auth] Log in success action',
  LogInFailure = '[Auth] Log in failure action',
  LoadUser = '[Auth] Load user action',
  LoadUserSuccess = '[Auth] Load user success action',
  LoadUserFailure = '[Auth] Load user failure action',
  Logout = '[Auth] Logout user',
  LogoutFailureAction = '[Auth] Logout user success action',
  LogoutSuccessAction = '[Auth] Logout user failure action',
  ClearLoginErrorMessage = '[Auth] Clear login error message',
}

export class LogInAction implements Action {
  public readonly type = AuthActionTypes.LogIn;

  constructor(public auth: Auth) {}
}

export class LogInSuccessAction implements Action {
  public readonly type = AuthActionTypes.LogInSuccess;
}

export class LogInFailureAction implements Action {
  public readonly type = AuthActionTypes.LogInFailure;

  constructor(public error: any) {}
}

export class LoadUserAction implements Action {
  public readonly type = AuthActionTypes.LoadUser;
}

export class LoadUserSuccessAction implements Action {
  public readonly type = AuthActionTypes.LoadUserSuccess;
}

export class LoadUserFailureAction implements Action {
  public readonly type = AuthActionTypes.LoadUserFailure;
}

export class LogOutAction implements Action {
  public readonly type = AuthActionTypes.Logout;
  //  constructor(public action: any) {}
}

export class ClearLoginErrorMessage implements Action {
  public readonly type = AuthActionTypes.ClearLoginErrorMessage;
}

export class LogOutSuccessAction implements Action {
  public readonly type = AuthActionTypes.LogoutSuccessAction;
}

export class LogOutFailureAction implements Action {
  public readonly type = AuthActionTypes.LogoutFailureAction;
  constructor(public error: any) {}
}

export type AuthAction =
  | LogInAction
  | LogInSuccessAction
  | LogInFailureAction
  | LoadUserAction
  | LoadUserSuccessAction
  | LoadUserFailureAction
  | LogOutAction
  | LogOutSuccessAction
  | LogOutFailureAction
  | ClearLoginErrorMessage;
