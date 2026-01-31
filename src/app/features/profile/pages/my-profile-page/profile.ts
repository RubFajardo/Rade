import {ChangeDetectorRef, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'; // Importa el locale
import {HabitsModel} from '../../services/habits.service';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {Habits} from '../../components/habits/habits';
import {EditProfile, ProfileData} from '../../components/edit-profile/edit-profile';
import {selectUser} from '../../../auth/state/auth.selectors';
import {EditAvatar} from '../../components/edit-avatar/edit-avatar';
import {selectFriends} from '../../../friends/state/friends.selectors';
import {toSignal} from '@angular/core/rxjs-interop';
import {updateAvatar, updateProfile} from '../../state/my-profile/profile.actions';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FullCalendarModule, Habits, EditProfile, EditAvatar],
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  isModalOpen = false;
  isEditProfileModalOpen = false;
  isUploadAvatarModalOpen = false;
  private cdr = inject(ChangeDetectorRef);

  private store = inject(Store);
  friends = toSignal(this.store.select(selectFriends), {initialValue: []});
  currentUser = toSignal(this.store.select(selectUser));

  habitsData: HabitsModel[] = [
    {
      date: "2025-10-30",
      trained: true,
      selectedWorkout: "Pesas",
      extraTraining: "Cardio 20 min",
      sleepQuality: "bien",
      description: "Buen entrenamiento de fuerza con enfoque en pecho y hombros.",
      totalCalories: 2500,
      totalProteins: 180,
      meals: [
        {type: "desayuno", food: "Huevos y pan", calories: "500", protein: "40"},
        {type: "almuerzo", food: "Pollo con arroz", calories: "800", protein: "60"},
        {type: "cena", food: "Pescado con verduras", calories: "600", protein: "50"}
      ]
    },
    {
      date: "2025-10-31",
      trained: false,
      selectedWorkout: "",
      extraTraining: "",
      sleepQuality: "mal",
      description: "Día de descanso, dormí poco y comí algo desordenado.",
      totalCalories: 2200,
      totalProteins: 120,
      meals: [
        {type: "desayuno", food: "Tostadas con mermelada", calories: "400", protein: "10"},
        {type: "almuerzo", food: "Pasta con carne", calories: "900", protein: "50"},
        {type: "cena", food: "Ensalada y yogurt", calories: "500", protein: "20"}
      ]
    },
  ];

  currentMonth: number = new Date().getMonth() + 1;
  currentYear: number = new Date().getFullYear();
  selectedDate: string | null = null;

  constructor(private http: HttpClient) {
  }

  handleSave(data: HabitsModel) {
    console.log('Datos de hábitos guardados:', data);
  }

  handleProfileSave(data: ProfileData) {
    console.log('Datos de perfil guardados:', data);
    this.store.dispatch(updateProfile({profile: data}))
    this.isEditProfileModalOpen = false;
  }

  handleAvatarUpload(data: File) {
    console.log('Datos de perfil guardados:', data);
    this.store.dispatch(updateAvatar({avatar: data}));
    this.isUploadAvatarModalOpen = false;
  }

  openEditProfileModal() {
    this.isEditProfileModalOpen = true;
  }

  openUploadAvatarModal() {
    this.isUploadAvatarModalOpen = true;
  }

  onMonthChange(date: Date) {
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    locale: esLocale, // Ya importado arriba
    firstDay: 1,
    height: 'auto',
    dayCellClassNames: 'custom-day-cell',
    dayHeaderClassNames: 'custom-header', // Cambiado de headerClassNames
    dateClick: (info) => this.onDateClick(info.dateStr),
    datesSet: (arg) => this.onMonthChange(arg.view.currentStart),
    dayCellDidMount: (arg) => {
      const y = arg.date.getFullYear();
      const m = String(arg.date.getMonth() + 1).padStart(2, '0');
      const d = String(arg.date.getDate()).padStart(2, '0');
      const cellDate = `${y}-${m}-${d}`;

      const habit = this.habitsData.find(h => h.date === cellDate);

      if (habit) {
        // Colores personalizados para días con hábitos
        arg.el.style.backgroundColor = habit.trained ? '#22c55e' : '#ef4444';
        arg.el.style.borderRadius = '8px';
        arg.el.style.transition = 'all 0.2s';
        arg.el.style.opacity = '0.2';

        // Agregar un indicador más sutil
        const indicator = document.createElement('div');
        indicator.style.position = 'absolute';
        indicator.style.bottom = '4px';
        indicator.style.left = '50%';
        indicator.style.transform = 'translateX(-50%)';
        indicator.style.width = '6px';
        indicator.style.height = '6px';
        indicator.style.borderRadius = '50%';
        indicator.style.backgroundColor = habit.trained ? '#fbbf24' : '#ef4444';
        arg.el.style.position = 'relative';
        arg.el.appendChild(indicator);
      }
    }
  };

  onDateClick(dateStr: string) {
    console.log('Día seleccionado:', dateStr);
    this.selectedDate = dateStr;
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

  get profileData(): ProfileData | null {
    const user = this.currentUser();

    if (!user || !user.profile) return null;

    return {
      name: user.name,
      age: user.profile.age,
      city: user.profile.city,
      country: user.profile.country,
      description: user.profile.description
    };
  }

  resetCalendar() {
    this.selectedDate = null;
  }
}
