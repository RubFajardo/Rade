import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HabitsModel} from '../habits/habits.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FullCalendarModule],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  habitsData: HabitsModel[] = [
    {
      date: "2025-10-30",
      trained: true,
      workout: "Pesas",
      extraTraining: "Cardio 20 min",
      sleep: "bien",
      description: "Buen entrenamiento de fuerza con enfoque en pecho y hombros.",
      totalCalories: 2500,
      totalProtein: 180,
      meals: [
        { type: "desayuno", food: "Huevos y pan", calories: "500", protein: "40" },
        { type: "almuerzo", food: "Pollo con arroz", calories: "800", protein: "60" },
        { type: "cena", food: "Pescado con verduras", calories: "600", protein: "50" }
      ]
    },
    {
      date: "2025-10-31",
      trained: false,
      workout: "",
      extraTraining: "",
      sleep: "mal",
      description: "Día de descanso, dormí poco y comí algo desordenado.",
      totalCalories: 2200,
      totalProtein: 120,
      meals: [
        { type: "desayuno", food: "Tostadas con mermelada", calories: "400", protein: "10" },
        { type: "almuerzo", food: "Pasta con carne", calories: "900", protein: "50" },
        { type: "cena", food: "Ensalada y yogurt", calories: "500", protein: "20" }
      ]
    },
    {
      date: "2025-11-01",
      trained: true,
      workout: "Tren inferior",
      extraTraining: "Caminata ligera 30 min",
      sleep: "bien",
      description: "Piernas intensas, buena recuperación posterior.",
      totalCalories: 2700,
      totalProtein: 190,
      meals: [
        { type: "desayuno", food: "Avena con leche y plátano", calories: "600", protein: "35" },
        { type: "almuerzo", food: "Carne magra con patatas", calories: "900", protein: "70" },
        { type: "cena", food: "Tortilla con ensalada", calories: "700", protein: "50" }
      ]
    },
    {
      date: "2025-11-02",
      trained: true,
      workout: "Cardio",
      extraTraining: "Abdominales 15 min",
      sleep: "bien",
      description: "Sesión de cardio suave con core.",
      totalCalories: 2400,
      totalProtein: 160,
      meals: [
        { type: "desayuno", food: "Smoothie de proteínas", calories: "450", protein: "40" },
        { type: "almuerzo", food: "Salmón con arroz integral", calories: "850", protein: "65" },
        { type: "cena", food: "Pollo y brócoli", calories: "600", protein: "55" }
      ]
    },
    {
      date: "2025-11-03",
      trained: false,
      workout: "",
      extraTraining: "",
      sleep: "mal",
      description: "Día de descanso total, algo cansado.",
      totalCalories: 2100,
      totalProtein: 110,
      meals: [
        { type: "desayuno", food: "Cereal con leche", calories: "400", protein: "20" },
        { type: "almuerzo", food: "Hamburguesa casera", calories: "900", protein: "60" },
        { type: "cena", food: "Sopa y pan", calories: "500", protein: "30" }
      ]
    },
    {
      date: "2025-11-04",
      trained: true,
      workout: "Tren superior",
      extraTraining: "Cardio suave 15 min",
      sleep: "bien",
      description: "Excelente sesión de espalda y bíceps, mucha energía.",
      totalCalories: 2800,
      totalProtein: 200,
      meals: [
        { type: "desayuno", food: "Tortilla con avena", calories: "600", protein: "45" },
        { type: "almuerzo", food: "Pollo al horno con quinoa", calories: "950", protein: "80" },
        { type: "cena", food: "Atún con verduras", calories: "700", protein: "60" }
      ]
    }
  ];

  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  selectedDate: string | null = null;

  onMonthChange(date: Date) {
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: 550,
    selectable: true,
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: '',
    },
    dateClick: (info) => this.onDateClick(info.dateStr),
    datesSet: (arg) => this.onMonthChange(arg.view.currentStart),
    dayCellDidMount: (arg) => {
      // Fecha actual
      const y = arg.date.getFullYear();
      const m = String(arg.date.getMonth() + 1).padStart(2, '0');
      const d = String(arg.date.getDate()).padStart(2, '0');
      const cellDate = `${y}-${m}-${d}`;

      // Busca el registro por esa fecha
      const habit = this.habitsData.find(h => h.date === cellDate);

      if (habit) {
        arg.el.style.backgroundColor = habit.trained ? '#bbf7d0' : '#fecaca';
        arg.el.style.borderRadius = '8px';
        arg.el.style.transition = 'all 0.2s';
      } else {
        arg.el.style.backgroundColor = 'white';
      }

    }
  };

  onDateClick(dateStr: string) {
    console.log('Día seleccionado:', dateStr);
    this.selectedDate = dateStr
    // GET a la API
  }

  get filteredHabits() {
    return this.habitsData.filter(h => {
      const habitDate = new Date(h.date);
      const sameMonth = habitDate.getMonth() + 1 === this.currentMonth;
      const sameYear = habitDate.getFullYear() === this.currentYear;
      const sameDay = !this.selectedDate || h.date === this.selectedDate;

      return sameMonth && sameYear && sameDay;
    });
  }

  resetCalendar() {
    this.selectedDate = null;
  }

  user = {
    name: 'Juan Pérez',
    email: 'juanperez@example.com',
    image: "https://preview.redd.it/yall-want-some-profile-pictures-v0-f6dsujppx9ze1.jpg?width=640&crop=smart&auto=webp&s=24f135e791451032264ecac063ed6787388e73b2",
  };
}
