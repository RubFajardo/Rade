import {createReducer, on} from '@ngrx/store';
import {UserStore} from '../../../auth/models/store.model';
import {
  clearProfile,
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess, updateAvatar, updateAvatarFailure, updateAvatarSuccess,
  updateProfile, updateProfileFailure,
  updateProfileSuccess
} from './my-profile.actions';

export interface ProfileState {
  visitedProfile: UserStore | null;
  loadingVisitedProfile: boolean;
  error: string | null,
  loading: boolean
}

export const initialState: ProfileState = {
  visitedProfile: null,
  loadingVisitedProfile: false,
  error: null,
  loading: false
};

export const myProfileReducer = createReducer(
  initialState,
  on(loadProfile, (state) => ({ ...state, loadingVisitedProfile: true, error: null })),
  on(loadProfileSuccess, (state, { profile }) => ({ ...state, visitedProfile: profile, loadingVisitedProfile: false })),
  on(loadProfileFailure, (state, { error }) => ({ ...state, visitedProfile: null, error, loading: false })),
  on(updateProfile, (state) => ({...state, loading: true, error: null })),
  on(updateProfileSuccess, (state) => ({...state, loading: false})),
  on(updateProfileFailure, (state, { error }) => ({ ...state, error: error.error.message, loading: false })),
  on(clearProfile, (state) => ({ ...state, profile: null, loading: false })),
  on(updateAvatar, (state) => ({...state, loading: true, error: null })),
  on(updateAvatarSuccess, (state) => ({...state, loading: false})),
  on(updateAvatarFailure, (state, { error }) => ({ ...state, error: error.error.message, loading: false })),
);
