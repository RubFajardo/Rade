import { createReducer, on } from '@ngrx/store';
import { loginUser, logoutUser } from './user.actions';
import {User} from '../login/login.service';

export interface UserState {
  user: User | null;
}

export const initialState: UserState = { user: null };

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state, { user }) => ({ ...state, user })),
  on(logoutUser, (state) => ({ ...state, user: null }))
);
