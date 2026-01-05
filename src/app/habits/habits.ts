import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HabitsModel, HabitsService} from './habits.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './habits.html'
})
export class Habits {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<HabitsModel>();
  currentStep = 1;

  date: string = "";
  trained: boolean | null = null;
  selectedWorkout: string | null = null;
  extraTraining: string = '';
  sleepQuality: string = '';
  meals = [
    {type: 'desayuno', food: '', calories: '', protein: ''},
    {type: 'almuerzo', food: '', calories: '', protein: ''},
    {type: 'cena', food: '', calories: '', protein: ''},
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

  constructor(private habitsService: HabitsService) {
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  closeModal() {
    this.isOpen = false;
    this.close.emit();
    this.currentStep = 1;
    this.resetForm();
  }


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

  private resetForm() {
    this.date = "";
    this.trained = null;
    this.selectedWorkout = null;
    this.extraTraining = '';
    this.sleepQuality = '';
    this.meals = [
      {type: 'desayuno', food: '', calories: '', protein: ''},
      {type: 'almuerzo', food: '', calories: '', protein: ''},
      {type: 'cena', food: '', calories: '', protein: ''},
    ];
    this.description = "";
  }
}

