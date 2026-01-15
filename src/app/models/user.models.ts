export interface UsersModel {
  id: string;
  email: string;
  name: string;
  profile: UserProfile;
  habits: HabitsModel;
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

export interface HabitsModel {
  date: string;
  trained: string;
  extraTraining: string;
  sleep: string;
  description: string;
  totalCalories: number;
  totalProtein: number;
  meals: {
    type: string;
    food: string;
    calories: string;
    protein: string;
  }[];
}

interface UserProfile {
  age: number;
  city: string;
  description: string;
  country: string;
  avatar: string;
}

export interface PendingFriendRequest {
  sender: Friends;
  requestId: number;
}

export interface Friends {
  id: number;
  name: string;
  description: string;
  avatar: string;
}

export interface Blockeds {
  id: number;
  name: string;
}

export interface PR {
  id: number;
  workoutType: string;
  weightLifted: number;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: UsersModel;
}

export interface UserStore {
  email: string;
  name: string;
  avatar: string;
  id: number;
}
