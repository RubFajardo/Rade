import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUser} from '../../auth/state/auth.selectors';


export interface HabitsModel {
  date: string;
  trained: boolean | null;
  selectedWorkout: string | null;
  extraTraining: string;
  sleepQuality: string;
  totalCalories: number;
  totalProteins: number;
  meals: {
    type: string;
    food: string;
    calories: string;
    protein: string;
  }[];
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class HabitsService {

  private store = inject(Store);
  user$ = this.store.select(selectUser);

  constructor(private http: HttpClient) {}

  private apiBaseUrl = 'https://habitstracker-api-8g6h.onrender.com/api/reports/user';

  createReport(data: HabitsModel): Observable<any> {
    return this.user$.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          throw new Error('Usuario no logueado');
        }
        const apiUrl = `${this.apiBaseUrl}/${user.id}`;
        return this.http.post(apiUrl, data);
      })
    );
  }
}
