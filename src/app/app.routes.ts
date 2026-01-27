import { Routes } from '@angular/router';
import {Login} from './features/auth/pages/login/login';
import {Habits} from './features/profile/components/habits/habits';
import {Profile} from './features/profile/pages/profile-page/profile';
import {Home} from './features/home/pages/home-page/home';

export const routes: Routes = [
  { path: '', component: Home }, // ruta raíz
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'habits', component: Habits },
  { path: 'profile', component: Profile },
  { path: '**', redirectTo: '' } // cualquier ruta no válida redirige a Home
];
