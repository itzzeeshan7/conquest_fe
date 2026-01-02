import { RegisterActionTypes, RegisteredAction } from '@app/pages/register/actions/register.action';

export interface State {
  isLoading: boolean;
  isSuccess: boolean;
  error: any;
}

export const initialState: State = {
  isLoading: null,
  isSuccess: false,
  error: null,
};

export function registerReducer(state: State = initialState, action: RegisteredAction): State {
  switch (action.type) {
    case RegisterActionTypes.ResetState:
      return {
        ...(state = initialState),
      };
    case RegisterActionTypes.ResetPasswordSuccess:
      return {
        ...state,
        isSuccess: true,
      };
    case RegisterActionTypes.ResetPasswordFailture:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case RegisterActionTypes.RequestResetPasswordSuccess:
      return {
        ...state,
        isSuccess: true,
      };
    case RegisterActionTypes.RequestResetPasswordFailture:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case RegisterActionTypes.ActivationEmailSuccess:
      return {
        ...state,
        isSuccess: true,
      };
    case RegisterActionTypes.ActivationEmailFailture:
      return {
        ...state,
        error: action.error,
      };
    case RegisterActionTypes.Register:
      return {
        ...state,
        isLoading: false,
      };
    case RegisterActionTypes.RegisterFailture:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case RegisterActionTypes.RegisterSuccess:
      return {
        ...state,
        isLoading: false,
        isSuccess: true,
      };
    default:
      return state;
  }
}
