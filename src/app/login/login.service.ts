import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private apiUrl = 'https://habitstracker-api-8g6h.onrender.com/api/auth';

  constructor(private http: HttpClient) {}

  login(user: User): Observable<any> {
    const body = { password: user.password, email: user.email };
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  register(user: User): Observable<any> {
    const body = { name: user.name, password: user.password, email: user.email };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
}
