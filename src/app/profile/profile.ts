import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {HabitsModel} from '../habits/habits.service';
import {Observable, take} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Store} from '@ngrx/store';
import {selectUser} from '../state/user.selectors';
import {Habits} from '../habits/habits';
import {UsersModel} from '../models/user.models';
import {EditProfile, ProfileData} from '../edit-profile/edit-profile';
import {EditAvatar} from '../edit-avatar/edit-avatar';
import {UserService} from '../services/user';

//import {EditProfileModal, ProfileData} from './edit-profile';

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
  currentUser: UsersModel | null = null;
  isUploadAvatarModalOpen = false;


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
  user$!: Observable<UsersModel | null>;

  constructor(private http: HttpClient, private store: Store, private userService: UserService) {
    this.user$ = this.store.select(selectUser);

    // Subscribe to user data to keep a local copy for the edit modal
    this.user$.subscribe(user => {
      this.currentUser = user;
    });
  }


  handleSave(data: HabitsModel) {
    console.log('Datos de hábitos guardados:', data);
  }

  handleProfileSave(data: ProfileData) {
    console.log('Datos de perfil guardados:', data);


    // this.http.put('/api/user/profile', data).subscribe({
    //   next: (response) => {
    //     console.log('Perfil actualizado exitosamente', response);
    //     // Actualizar el store con los nuevos datos
    //     // this.store.dispatch(updateUserProfile({ profile: data }));
    //     this.isEditProfileModalOpen = false;
    //   },
    //   error: (error) => {
    //     console.error('Error al actualizar perfil', error);
    //   }
    // });

    // Por ahora solo cerramos el modal
    this.isEditProfileModalOpen = false;
  }

  openEditProfileModal() {
    this.isEditProfileModalOpen = true;
  }

  onMonthChange(date: Date) {
    this.currentMonth = date.getMonth() + 1;
    this.currentYear = date.getFullYear();
  }

  openUploadAvatarModal(): void {
    this.isUploadAvatarModalOpen = true;
  }

  handleAvatarUpload(file: File): void {
    const formData = new FormData();
    formData.append('avatar', file);

    this.userService.uploadAvatar(formData).subscribe({
      next: (response: { avatarUrl: string; }) => {
        // Actualizar directamente la URL del avatar
        this.user$.pipe(take(1)).subscribe(user => {
          // @ts-ignore
          user.profile.avatar = response.avatarUrl;
        });
        this.isUploadAvatarModalOpen = false;
      }
    });
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
      const y = arg.date.getFullYear();
      const m = String(arg.date.getMonth() + 1).padStart(2, '0');
      const d = String(arg.date.getDate()).padStart(2, '0');
      const cellDate = `${y}-${m}-${d}`;

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
    if (!this.currentUser?.profile) return null;

    return {
      avatar: this.currentUser.profile.avatar,
      name: this.currentUser.name,
      age: this.currentUser.profile.age,
      city: this.currentUser.profile.city,
      country: this.currentUser.profile.country,
      description: this.currentUser.profile.description
    };
  }

  resetCalendar() {
    this.selectedDate = null;
  }
}
