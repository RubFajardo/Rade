import {createFeatureSelector, createSelector} from '@ngrx/store';
import {FriendsState} from './friends.reducer';

export const selectFriendsState = createFeatureSelector<FriendsState>('friends');

export const selectFriends = createSelector(
  selectFriendsState,
  (state) => state.friends
);

export const selectPendingRequests = createSelector(
  selectFriendsState,
  (state) => state.pendingRequests
);

export const selectLoadingFriends = createSelector(
  selectFriendsState,
  (state) => state.loadingFriends
);

export const selectLoadingRequests = createSelector(
  selectFriendsState,
  (state) => state.loadingRequests
);

export const selectLoadingAction = createSelector(
  selectFriendsState,
  (state) => state.loadingAction
);

export const selectError = createSelector(
  selectFriendsState,
  (state) => state.error
);
