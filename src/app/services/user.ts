import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface AvatarUploadResponse {
  success: boolean;
  avatarUrl: string;
  message?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api'; // Cambia esto por tu URL de API

  constructor(private http: HttpClient) {
  }


  /**
   * Obtiene la información del perfil del usuario
   */
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/profile`);
  }

  /**
   * Actualiza la información del perfil del usuario
   */
  updateProfile(profileData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/user/profile`, profileData);
  }


  /**
   * Sube un nuevo avatar para el usuario
   */
  uploadAvatar(formData: FormData): Observable<AvatarUploadResponse> {
    return this.http.post<AvatarUploadResponse>(
      `${this.apiUrl}/user/avatar`,
      formData
    );
  }
}
