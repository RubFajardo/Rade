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
import {myProfileReducer} from './features/profile/state/my-profile/my-profile.reducer';
import {MyProfileEffects} from './features/profile/state/my-profile/my-profile.effects';
import {FriendsEffects} from './features/friends/state/friends.effects';
import {friendsReducer} from './features/friends/state/friends.reducer';
import {myUserProfileReducer} from './features/profile/state/user-profile/user-profile.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ user: userReducer, profile: myProfileReducer, friends: friendsReducer, userProfile: myUserProfileReducer }),
    provideEffects([AuthEffects, MyProfileEffects, FriendsEffects]),
    CookieService
]
};
