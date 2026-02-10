import { createSelector, createFeatureSelector } from '@ngrx/store';
import {ProfileState} from './my-profile.reducer';

export const selectProfileState = createFeatureSelector<ProfileState>('profile');

export const selectVisitedProfile = createSelector(
  selectProfileState,
  (state) => state.visitedProfile
);

export const selectLoadingVisitedProfile = createSelector(
  selectProfileState,
  (state) => state.loadingVisitedProfile
);

export const selectLoading = createSelector(
  selectProfileState,
  (state) => state.loading
);

export const selectProfileError = createSelector(
  selectProfileState,
  (state) => state.error
);


