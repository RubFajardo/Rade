import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {FriendsService} from '../services/friends-bar.service';
import {
  acceptFriend, acceptFriendFailure, acceptFriendSuccess,
  loadFriends,
  loadFriendsFailure,
  loadFriendsSuccess,
  loadPendingRequests, pendingRequestsFailure,
  pendingRequestsSuccess, rejectFriend, rejectFriendFailure, rejectFriendSuccess
} from './friends.actions';
import {catchError, exhaustMap, map, of, switchMap} from 'rxjs';

@Injectable()
export class FriendsEffects {
  private actions$ = inject(Actions);
  private friendsService = inject(FriendsService);
  private router = inject(Router);

  loadFriends$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadFriends),
    switchMap( () => this.friendsService.getFriends().pipe(
      map(res => {
        return loadFriendsSuccess({ friends: res });
      }),
      catchError(error => of(loadFriendsFailure({ error })))
    ))
  )
  );

  loadPendingRequests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPendingRequests),
      switchMap( () => this.friendsService.getPendingRequests().pipe(
        map(res => {
          return pendingRequestsSuccess({ pendingRequests: res });
        }),
        catchError(error => of(pendingRequestsFailure({ error })))
      ))
    )
  );

  acceptFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(acceptFriend),
      exhaustMap( action => this.friendsService.acceptFriend(action.requestId).pipe(
        map(res => {
          return acceptFriendSuccess({ friend: res, requestId: action.requestId });
        }),
        catchError(error => of(acceptFriendFailure({ error })))
      ))
    )
  );

  rejectFriend$ = createEffect(() =>
    this.actions$.pipe(
      ofType(rejectFriend),
      exhaustMap( action => this.friendsService.rejectFriend(action.requestId).pipe(
        map(res => {
          return rejectFriendSuccess({ requestId: action.requestId });
        }),
        catchError(error => of(rejectFriendFailure({ error })))
      ))
    )
  );






}
