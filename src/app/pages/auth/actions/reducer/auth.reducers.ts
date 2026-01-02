import { AuthAction, AuthActionTypes } from '../auth.action';

export interface State {
  isLoading: boolean;
  isAuthenticated: boolean;
  error: any;
}

export const initialState: State = {
  isLoading: null,
  isAuthenticated: false,
  error: null,
};

export function authReducer(state: State = initialState, action: AuthAction): State {
  switch (action.type) {
    case AuthActionTypes.LogIn:
      return { ...state };
    case AuthActionTypes.LogInSuccess:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    case AuthActionTypes.LogInFailure:
      return {
        ...state,
        error: action?.error?.error || 'Login failed.',
        isLoading: false,
        isAuthenticated: false,
      };
    case AuthActionTypes.LoadUser:
      return { ...state };
    case AuthActionTypes.LoadUserSuccess:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      };
    case AuthActionTypes.LoadUserFailure:
      return {
        ...state,
        error: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case AuthActionTypes.Logout:
      return { ...state };
    case AuthActionTypes.LogoutSuccessAction:
      return { ...state, error: null, isLoading: false, isAuthenticated: false };
    case AuthActionTypes.LogoutFailureAction:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: action?.error?.error || 'Logout failed.',
      };
    case AuthActionTypes.ClearLoginErrorMessage:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}
