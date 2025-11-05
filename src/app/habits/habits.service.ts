import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


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

  user = JSON.parse(localStorage.getItem('user')!);

  private apiUrl = 'https://habitstracker-api-8g6h.onrender.com/api/reports';

  constructor(private http: HttpClient) {}

  createReport(data: HabitsModel): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
