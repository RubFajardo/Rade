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
