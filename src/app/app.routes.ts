import { Routes } from '@angular/router';
import {Login} from './features/auth/pages/login/login';
import {Habits} from './features/profile/components/habits/habits';
import {Home} from './features/home/pages/home-page/home';
import {Profile} from './features/profile/pages/my-profile-page/profile';
import {Friends} from './features/friends/pages/friends-page/friends';
import {OauthSuccess} from './features/auth/pages/oauth-success/oauth-success';
import {UserView} from './features/profile/pages/user-view-page/user-view';

export const routes: Routes = [
  { path: 'oauth-success', component: OauthSuccess },
  { path: '', component: Home }, // ruta raíz
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'habits', component: Habits },
  { path: 'profile', component: Profile },
  { path: 'friends', component: Friends },
  { path: '**', redirectTo: '' } // cualquier ruta no válida redirige a Home
];
