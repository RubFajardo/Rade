import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {Store} from '@ngrx/store';
import {selectUser} from '../state/user.selectors';
import {UsersModel} from '../models/user.models';


export interface HabitsModel {
  date: string;
  trained: boolean | null;
  workout: string | null;
  extraTraining: string;
  sleep: string;
  totalCalories: number;
  totalProtein: number;
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

  user$!: Observable<UsersModel | null>;

  constructor(private http: HttpClient, private store: Store) {
    this.user$ = this.store.select(selectUser);
  }

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
