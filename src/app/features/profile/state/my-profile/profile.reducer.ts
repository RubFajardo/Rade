import {createReducer, on} from '@ngrx/store';
import {ProfileData} from '../../components/edit-profile/edit-profile';
import {
  clearProfile,
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess, updateAvatar, updateAvatarFailure, updateAvatarSuccess,
  updateProfile,
  updateProfileFailure, updateProfileSuccess
} from './profile.actions';

export interface ProfileState {
  profile: ProfileData | null;
  error: string | null,
  loading: boolean
}

export const initialState: ProfileState = {
  profile: null,
  error: null,
  loading: false
};

export const profileReducer = createReducer(
  initialState,
  on(loadProfile, (state) => ({ ...state, loading: true, error: null })),
  on(loadProfileSuccess, (state, { profile }) => ({ ...state, profile, loading: false })),
  on(loadProfileFailure, (state, { error }) => ({ ...state, profile: null, error, loading: false })),
  on(updateProfile, (state) => ({...state, loading: true, error: null })),
  on(updateProfileSuccess, (state) => ({...state, loading: false})),
  on(updateProfileFailure, (state, { error }) => ({ ...state, error: error.error.message, loading: false })),
  on(clearProfile, (state) => ({ ...state, profile: null, loading: false })),
  on(updateAvatar, (state) => ({...state, loading: true, error: null })),
  on(updateAvatarSuccess, (state) => ({...state, loading: false})),
  on(updateAvatarFailure, (state, { error }) => ({ ...state, error: error.error.message, loading: false })),
);
