import { createSelector, createFeatureSelector } from '@ngrx/store';
import {UserProfileState} from './user-profile.reducer';

export const selectUserProfileState = createFeatureSelector<UserProfileState>('userProfile');

export const selectVisitedProfile = createSelector(
  selectUserProfileState,
  (state) => state.visitedProfile
);

export const selectLoadingVisitedProfile = createSelector(
  selectUserProfileState,
  (state) => state.loadingVisitedProfile
);

export const selectVisitedProfileFriends = createSelector(
  selectUserProfileState,
  (state) => state.visitedProfileFriends
);

export const selectLoadingFriends = createSelector(
  selectUserProfileState,
  (state) => state.loadingFriends
);

export const selectUserProfileError = createSelector(
  selectUserProfileState,
  (state) => state.error
);
