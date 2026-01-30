import { createSelector, createFeatureSelector } from '@ngrx/store';
import {ProfileState} from './profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectProfile = createSelector(
  selectProfileState,
  (state) => state.profile
);

export const selectLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);


