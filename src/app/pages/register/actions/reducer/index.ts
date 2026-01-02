import * as fromRegisterState from './register.reducers';
import { registerReducer } from './register.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface RegisterState {
  registerList: fromRegisterState.State;
}

export const reducers = {
  registerList: registerReducer,
};

export const getRegisterState = createFeatureSelector<RegisterState>('register');

export const getRegisterListState = createSelector(getRegisterState, (state: RegisterState) => state.registerList);

export const getLoading = createSelector(getRegisterListState, (state: fromRegisterState.State) => state.isLoading);
export const getIsSuccess = createSelector(getRegisterListState, (state: fromRegisterState.State) => state.isSuccess);

export const getError = createSelector(getRegisterListState, (state: fromRegisterState.State) => state.error);
