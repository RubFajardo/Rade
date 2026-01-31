import {Component, EventEmitter, Input, Output} from '@angular/core';
import {HabitsModel, HabitsService} from '../../services/habits.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [FormsModule],
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
    // Generar la fecha actual en formato YYYY-MM-DD
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;

    // Mapear el selectedWorkout al formato legible
    let workoutName = '';
    if (this.selectedWorkout === 'cardio') {
      workoutName = 'Cardio';
    } else if (this.selectedWorkout === 'superior') {
      workoutName = 'Tren Superior';
    } else if (this.selectedWorkout === 'inferior') {
      workoutName = 'Tren Inferior';
    }

    const data: HabitsModel = {
      date: currentDate,
      trained: this.trained ?? false,
      selectedWorkout: workoutName,
      extraTraining: this.extraTraining,
      sleepQuality: this.sleepQuality,
      meals: this.meals,
      description: this.description,
      totalCalories: this.totalCalories,
      totalProteins: this.totalProteins,
    };

    this.save.emit(data);
    this.closeModal();
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
