import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileData} from '../components/edit-profile/edit-profile';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users/profile';

  constructor(private http: HttpClient) {}

  loadOwnProfile(): Observable<ProfileData> {
    return this.http.get<ProfileData>(`${this.apiUrl}/me`, {});
  }

  updateProfile(data: ProfileData): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/update`, data);
  }

}
