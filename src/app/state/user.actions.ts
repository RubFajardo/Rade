import { createAction, props } from '@ngrx/store';
import {UsersModel} from '../models/user.models';


export const loginUser = createAction('[User] Login', props<{ user: UsersModel }>());
export const logoutUser = createAction('[User] Logout');
