import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Router} from '@angular/router';
import {catchError, exhaustMap, map, of} from 'rxjs';
import {ProfileService} from '../services/profile.service';
import {
  loadProfile,
  loadProfileFailure,
  loadProfileSuccess,
  updateProfile, updateProfileFailure,
  updateProfileSuccess
} from './profile.actions';

@Injectable()
export class ProfileEffects {
  private actions$ = inject(Actions);
  private profileService = inject(ProfileService);
  private router = inject(Router);

  loadProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProfile),
      exhaustMap(action =>
        this.profileService.loadOwnProfile().pipe(
          map(res => {
            return loadProfileSuccess({ profile: res });
          }),
          catchError(error => of(loadProfileFailure({ error })))
        )
      )
    )
  );

  updateProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProfile),
      exhaustMap(action =>
        this.profileService.updateProfile(action.profile).pipe(
          map(res => {
            return updateProfileSuccess({ profile: res });
          }),
          catchError(error => of(updateProfileFailure({ error })))
        )
      )
    )
  );
}
