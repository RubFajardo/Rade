import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProfileData} from '../components/edit-profile/edit-profile';
import {UserStore} from '../../auth/models/store.model';

@Injectable({providedIn: 'root'})
export class ProfileService {
  private apiUrl = 'http://localhost:8080/api/users/profile';

  constructor(private http: HttpClient) {}

  loadUserProfile(userId: number): Observable<UserStore> {
    return this.http.get<UserStore>(`${this.apiUrl}/${userId}`);
  }

  updateProfile(data: ProfileData): Observable<any> {
    return this.http.put(`${this.apiUrl}/me/update`, data);
  }

  updateAvatar(data: FormData): Observable<string> {
    return this.http.put(`${this.apiUrl}/upload-avatar`, data, {
      responseType: 'text'
    });
  }

}
