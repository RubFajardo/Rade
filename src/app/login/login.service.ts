import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthResponse} from '../models/user.models';


export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

@Injectable({providedIn: 'root'})
export class UserService {
  private apiUrl = 'https://habitstracker-api-8g6h.onrender.com/api/auth';

  constructor(private http: HttpClient) {
  }

  login(data: LoginPayload): Observable<AuthResponse> {
    const body = { password: data.password, email: data.email };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body);
  }

  register(data: RegisterPayload): Observable<any> {
    const body = {name: data.name, password: data.password, email: data.email};
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}
