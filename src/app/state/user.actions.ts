import {User} from '../login/login.service';
import { createAction, props } from '@ngrx/store';


export const loginUser = createAction('[User] Login', props<{ user: User }>());
export const logoutUser = createAction('[User] Logout');
