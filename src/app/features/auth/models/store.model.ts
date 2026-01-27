import {UserProfile} from './user-profile.model';

export interface UserStore {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  config: {
    profile: boolean;
    habits: boolean;
    friends: boolean;
  }
}
