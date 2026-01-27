import {createAction, props} from '@ngrx/store';
import {LoginPayload, RegisterPayload} from '../models/credentials.model';
import {UserStore} from '../models/store.model';

export const loginUser = createAction(
  '[Auth] Login User',
  props<{ credentials: LoginPayload }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserStore}>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);

export const logoutUser = createAction('[Auth] Logout');

export const initAuth = createAction('[Auth] Init');

export const registerUser = createAction('[Auth] Register User', props<{ credentials: RegisterPayload }>());

export const registerUserSuccess = createAction(
  '[Auth] Register Success');

export const registerUserFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
