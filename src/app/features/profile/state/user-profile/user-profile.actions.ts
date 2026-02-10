import {createAction, props} from '@ngrx/store';
import {UserStore} from '../../../auth/models/store.model';
import {Friends} from '../../../friends/models/friends.model';

export const loadUserProfile = createAction(
  '[Profile] Load Profile',
  props<{ userId: number }>()
);

export const loadUserProfileSuccess = createAction(
  '[Profile] Load Profile Success',
  props<{ userProfile: UserStore}>()
);

export const loadUserProfileFailure = createAction(
  '[Profile] Load Profile Failure',
  props<{ error: any }>()
);

export const loadUserFriends = createAction(
  '[Profile] Load Friends',
  props<{ userId: number }>()
);

export const loadUserFriendsSuccess = createAction(
  '[Profile] Load Friends Success',
  props<{ friends: Friends[] }>()
);

export const loadUserFriendsFailure = createAction(
  '[Profile] Load Friends Failure',
  props<{ error: any }>()
);

export const clearUserProfile = createAction('[Profile] Clear Profile');
