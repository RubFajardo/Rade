import {UserProfile} from './user-profile.model';

export interface UserStore {
  id: number;
  email: string;
  name: string;
  profile: UserProfile;
  config: {
    profile: boolean;
    habits: boolean;
    friends: boolean;
  }
}
 
