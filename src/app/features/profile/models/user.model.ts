import {HabitsModel} from './habits.model';
import {UserProfile} from '../../auth/models/user-profile.model';
import {Friends} from '../../friends/models/friends.model';
import {Blockeds} from './blockeds.model';
import {PR} from './pr.model';


export interface UsersModel {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  habits: HabitsModel[]
  friends: Friends[]
  config: {
    invisibility: {
      profile: boolean;
      habits: boolean;
      friends: boolean;
    }
    blockeds: Blockeds[],
  }
  pr: PR[]
}
