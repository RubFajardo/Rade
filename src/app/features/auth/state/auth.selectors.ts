import { createSelector, createFeatureSelector } from '@ngrx/store';
import {UserState} from './auth.reducer';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUser = createSelector(
  selectUserState,
  (state) => state.user
);

export const selectLoading = createSelector(
  selectUserState,
  (state) => state.loading
);

export const selectLoginError = createSelector(
  selectUserState,
  (state) => state.errorLogin
);

export const selectSuccessMessage = createSelector(
  selectUserState,
  (state) => state.successMessage
);


