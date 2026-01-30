import {inject, Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {LoginService} from '../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {catchError, exhaustMap, map, mergeMap, of, switchMap, tap} from 'rxjs';
import {
  initAuth,
  loginFailure,
  loginSuccess,
  loginUser,
  logoutUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from './auth.actions';
import {loadProfile} from '../../profile/state/my-profile/profile.actions';
import {loadFriends, loadPendingRequests} from '../../friends/state/friends.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private loginService = inject(LoginService);
  private cookieService = inject(CookieService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      exhaustMap(action =>
        this.loginService.login(action.credentials).pipe(
          map(res => {
            console.log(res)
            this.cookieService.set(
              'auth_token',
              res.token,
              15,              // días guardado
              '/',
              undefined,
              true,
              'Strict'
            );
            this.router.navigate(['/profile']);
            return loginSuccess({user: res.user});
          }),
          catchError(error => of(loginFailure({error})))
        )
      )
    )
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logoutUser),
        tap(() => {
          this.cookieService.delete('auth_token', '/');
        })
      ),
    {dispatch: false}
  );

  initAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(initAuth),
      map(() => this.cookieService.get('auth_token')),
      switchMap((token) => {
        if (!token) {
          return of(logoutUser());
        }

        return this.loginService.getCurrentUser().pipe(
          map((user) => {
            console.log(user);
            return loginSuccess({ user });
          }),
          catchError(() => {
            // Token inválido o expirado
            return of(logoutUser());
          })
        );
      })
    )
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      exhaustMap(action =>
        this.loginService.register(action.credentials).pipe(
          map(res => {
            console.log(res);
            return registerUserSuccess();
          }),
          catchError(error => {
            console.error('Error en el registro:', error);
            return of(registerUserFailure({error}));
          })
        )
      )
    )
  );

  loadFriendsAfterLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginSuccess),
      mergeMap(() => [
        loadPendingRequests(),
        loadFriends()
      ])
    )
  );

}
