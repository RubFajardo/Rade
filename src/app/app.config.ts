import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import {authInterceptor} from './core/interceptors/auth.interceptor';
import {AuthEffects} from './features/auth/state/auth.effects';
import {userReducer} from './features/auth/state/auth.reducer';
import {profileReducer} from './features/profile/state/my-profile/profile.reducer';
import {ProfileEffects} from './features/profile/state/my-profile/profile.effects';
import {FriendsEffects} from './features/friends/state/friends.effects';
import {friendsReducer} from './features/friends/state/friends.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ user: userReducer, profile: profileReducer, friends: friendsReducer }),
    provideEffects([AuthEffects, ProfileEffects, FriendsEffects]),
    CookieService
]
};
