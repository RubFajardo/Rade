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

export interface Friends {
  id: string;
  name: string;
  description: string;
  avatar: string;
}

interface Blockeds {
  id: string;
  name: string;
}

interface PR {
  id: string;
  workoutType: string;
  weightLifted: number;
  createdAt: string;
}
