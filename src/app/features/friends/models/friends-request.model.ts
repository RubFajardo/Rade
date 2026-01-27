import {Friends} from './friends.model';

export interface PendingFriendRequest {
  sender: Friends;
  requestId: number;
}
