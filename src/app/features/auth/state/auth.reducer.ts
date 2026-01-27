import {createReducer, on} from '@ngrx/store';
import {
  loginFailure,
  loginSuccess,
  loginUser,
  logoutUser,
  registerUser,
  registerUserFailure,
  registerUserSuccess
} from './auth.actions';
import {UserStore} from '../models/store.model';

export interface UserState {
  user: UserStore | null;
  errorLogin: string | null,
  loading: boolean,
  successMessage: string | null
}

export const initialState: UserState = {
  user: null,
  errorLogin: null,
  loading: false,
  successMessage: null
};

export const userReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({ ...state, loading: true, errorLogin: null })),
  on(loginSuccess, (state, { user }) => ({ ...state, user, loading: false })),
  on(loginFailure, (state, { error }) => ({ ...state, user: null, errorLogin: error, loading: false })),
  on(logoutUser, (state) => ({...state, user: null})),
  on(registerUser, (state) => ({ ...state, loading: true, errorLogin: null })),
  on(registerUserSuccess, (state) => ({ ...state, loading: false, successMessage: "¡Registro completado con éxito! Inicia sesión para continuar." })),
  on(registerUserFailure, (state, { error }) => ({ ...state, loading: false, errorLogin: error })),
);
