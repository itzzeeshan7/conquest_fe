import * as fromAuthState from './auth.reducers';
import { authReducer } from './auth.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
  authList: fromAuthState.State;
}

export const reducers = {
  authList: authReducer,
};

export const getAuthState = createFeatureSelector<AuthState>('auth');

export const getAuthListState = createSelector(getAuthState, (state: AuthState) => state.authList);

export const getLoggedIn = createSelector(getAuthListState, (state: fromAuthState.State) => state.isAuthenticated);

export const getError = createSelector(getAuthListState, (state: fromAuthState.State) => state.error);
