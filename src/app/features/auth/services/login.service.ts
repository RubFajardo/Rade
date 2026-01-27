import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginPayload, RegisterPayload} from '../models/credentials.model';
import {AuthResponse} from '../models/auth-response.model';
import {UserStore} from '../models/store.model';


@Injectable({providedIn: 'root'})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/auth';

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

  getCurrentUser(): Observable<UserStore> {
    return this.http.get<UserStore>(`${this.apiUrl}/me`);
  }


}
