import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, switchMap, map, of} from 'rxjs';
import {ProfileService} from '../../services/profile.service';
import {
  loadUserFriends,
  loadUserFriendsFailure, loadUserFriendsSuccess,
  loadUserProfile,
  loadUserProfileFailure,
  loadUserProfileSuccess
} from './user-profile.actions';
import {FriendsService} from '../../../friends/services/friends-bar.service';

@Injectable()
export class MyUserProfileEffects {

  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);
  private friendsService = inject(FriendsService);

  loadUserProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserProfile),
      switchMap(action =>
        this.profileService.loadUserProfile(action.userId).pipe(
          map(res => {
            return loadUserProfileSuccess({ userProfile: res });
          }),
          catchError(error => of(loadUserProfileFailure({ error })))
        )
      )
    )
  );

  loadUserFriends$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserFriends),
      switchMap(action =>
        this.friendsService.getFriends(action.userId).pipe(
          map(res => {
            return loadUserFriendsSuccess({ friends: res });
          }),
          catchError(error => of(loadUserFriendsFailure({ error })))
        )
      )
    )
  );
}
