import {createAction, props} from '@ngrx/store';
import {ProfileData} from '../components/edit-profile/edit-profile';

export const loadProfile = createAction(
  '[User] Load Profile');

export const loadProfileSuccess = createAction(
  '[User] Load Profile Success',
  props<{ profile: ProfileData}>()
);

export const loadProfileFailure = createAction(
  '[User] Load Profile Failure',
  props<{ error: any }>()
);

export const clearProfile = createAction('[User] Clear Profile');

export const updateProfile = createAction(
  '[User] Update Profile',
  props<{ profile: ProfileData }>()
);

export const updateProfileSuccess = createAction(
  '[User] Update Profile Success',
  props<{ profile: ProfileData }>()
);

export const updateProfileFailure = createAction(
  '[User] Update Profile Failure',
  props<{ error: any }>()
);
