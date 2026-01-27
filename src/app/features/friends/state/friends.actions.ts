import {createAction, props} from '@ngrx/store';
import {Friends} from '../models/friends.model';
import {PendingFriendRequest} from '../models/friends-request.model';

export const loadFriends = createAction(
  '[Friends] Load Friends');

export const loadFriendsSuccess = createAction(
  '[Friends] Load Friends Success',
  props<{ friends: Friends[] }>()
);

export const loadFriendsFailure = createAction(
  '[Friends] Load Friends Failure',
  props<{ error: any }>()
);

export const loadPendingRequests = createAction(
  '[Friends] Load Pending Requests');

export const pendingRequestsSuccess = createAction(
  '[Friends] Load Requests Success',
  props<{ pendingRequests: PendingFriendRequest[] }>()
);

export const pendingRequestsFailure = createAction(
  '[Friends] Load Requests Failure',
  props<{ error: any }>()
);

export const acceptFriend = createAction(
  '[Friends] Accept Friend', props<{ requestId: number }>());

export const acceptFriendSuccess = createAction(
  '[Friends] Accept Friend Success',
  props<{ friend: Friends, requestId: number }>()
);

export const acceptFriendFailure = createAction(
  '[Friends] Accept Friend Failure',
  props<{ error: any }>()
);

export const rejectFriend = createAction(
  '[Friends] Reject Friend', props<{ requestId: number }>());

export const rejectFriendSuccess = createAction(
  '[Friends] Reject Friend Success',
  props<{ requestId: number }>()
);

export const rejectFriendFailure = createAction(
  '[Friends] Reject Friend Failure',
  props<{ error: any }>()
);

export const clearFriends = createAction(
  '[Friends] Clear Friends'
)
