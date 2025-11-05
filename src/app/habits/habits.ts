import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HabitsModel, HabitsService} from './habits.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habits.html'
})
export class Habits {

  date: string = "";
  trained: boolean | null = null;
  selectedWorkout: string | null = null;
  extraTraining: string = '';
  sleepQuality: string = '';
  meals = [
    { type: 'desayuno', food: '', calories: '', protein: '' },
    { type: 'almuerzo', food: '', calories: '', protein: '' },
    { type: 'cena', food: '', calories: '', protein: '' },
  ];
  description: string = "";

  get totalCalories(): number {
    return this.meals.reduce(
      (acc, meal) => acc + (Number(meal.calories) || 0),
      0
    );
  }

  get totalProteins(): number {
    return this.meals.reduce(
      (acc, meal) => acc + (Number(meal.protein) || 0),
      0
    );
  }

  constructor(private habitsService: HabitsService) {}

  onSubmit() {
    const data: HabitsModel = {
      date: this.date,
      trained: this.trained,
      workout: this.selectedWorkout,
      extraTraining: this.extraTraining,
      sleep: this.sleepQuality,
      meals: this.meals,
      description: this.description,
      totalCalories: this.totalCalories,
      totalProtein: this.totalProteins,
    };
  }
}

