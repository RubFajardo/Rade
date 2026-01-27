import {Friends} from '../models/friends.model';
import {PendingFriendRequest} from '../models/friends-request.model';
import {createReducer, on} from '@ngrx/store';
import {
  acceptFriend, acceptFriendFailure, acceptFriendSuccess, clearFriends,
  loadFriends,
  loadFriendsFailure,
  loadFriendsSuccess,
  loadPendingRequests, pendingRequestsFailure,
  pendingRequestsSuccess, rejectFriend, rejectFriendFailure, rejectFriendSuccess
} from './friends.actions';

export interface FriendsState {
  friends: Friends[];
  pendingRequests: PendingFriendRequest[];
  loadingFriends: boolean;
  loadingRequests: boolean;
  loadingAction: boolean;
  error: string | null;
}

export const initialState: FriendsState = {
  friends: [],
  pendingRequests: [],
  loadingFriends: false,
  loadingAction: false,
  loadingRequests: false,
  error: null,
};

export const friendsReducer = createReducer(
  initialState,
  on(loadFriends, (state) => ({ ...state, loadingFriends: true, error: null })),
  on(loadFriendsSuccess, (state, { friends }) => ({ ...state, friends, loadingFriends: false })),
  on(loadFriendsFailure, (state, { error }) => ({ ...state, error, loadingFriends: false })),
  on(loadPendingRequests, (state) => ({ ...state, loadingRequests: true, error: null })),
  on(pendingRequestsSuccess, (state, { pendingRequests }) => ({ ...state, pendingRequests, loadingRequests: false })),
  on(pendingRequestsFailure,(state, {error}) => ({ ...state, error, loadingRequests: false }) ),
  on(acceptFriend, (state) => ({ ...state, error: null, loadingAction: true })),
  on(acceptFriendSuccess, (state, { friend, requestId }) => ({...state, friends: [...state.friends, friend], loadingAction: false, pendingRequests: state.pendingRequests.filter(f  => f.requestId != requestId) })),
  on(acceptFriendFailure, (state, {error}) => ({ ...state, error, loadingAction: false })),
  on(rejectFriend, (state) => ({ ...state, error: null, loadingAction: true })),
  on(rejectFriendSuccess, (state, { requestId }) => ({...state, loadingAction: false, pendingRequests: state.pendingRequests.filter(f => f.requestId != requestId)})),
  on(rejectFriendFailure, (state, { error }) => ({ ...state, error, loadingAction: false })),
  on(clearFriends, (state) => ({ ...state, pendingRequests: [], friends: [] })),
  );
