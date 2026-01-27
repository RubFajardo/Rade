import {UserStore} from './store.model';

export interface AuthResponse {
  token: string;
  user: UserStore;
}
