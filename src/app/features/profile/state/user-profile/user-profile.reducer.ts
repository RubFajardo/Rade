import {UserStore} from '../../../auth/models/store.model';
import {createReducer, on} from '@ngrx/store';
import {Friends} from '../../../friends/models/friends.model';
import {
  loadUserFriends, loadUserFriendsFailure,
  loadUserFriendsSuccess,
  loadUserProfile,
  loadUserProfileFailure,
  loadUserProfileSuccess
} from './user-profile.actions';

export interface UserProfileState {
  visitedProfile: UserStore | null;
  loadingVisitedProfile: boolean;
  error: string | null,
  visitedProfileFriends: Friends[] | null;
  loadingFriends: boolean
}

export const initialState: UserProfileState = {
  visitedProfile: null,
  loadingVisitedProfile: false,
  error: null,
  visitedProfileFriends: null,
  loadingFriends: false
};

export const myUserProfileReducer = createReducer(
  initialState,
  on(loadUserProfile, (state) => ({ ...state, loadingVisitedProfile: true, error: null })),
  on(loadUserProfileSuccess, (state, { userProfile }) => ({ ...state, loadingVisitedProfile: false, visitedProfile: userProfile })),
  on(loadUserProfileFailure, (state, { error }) => ({ ...state, error: error.error.message, loadingVisitedProfile: false })),
  on(loadUserFriends, (state) => ({ ...state, loadingFriends: true })),
  on(loadUserFriendsSuccess, (state, { friends }) => ({ ...state, loadingFriends: false, visitedProfileFriends: friends })),
  on(loadUserFriendsFailure, (state, { error }) => ({ ...state, error: error.error.message, loadingFriends: false })),
);
