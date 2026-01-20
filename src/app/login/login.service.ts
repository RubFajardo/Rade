import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthResponse, UsersModel } from '../models/user.models';

// ============================================
// INTERFACES
// ============================================

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface AvatarUploadResponse {
  success: boolean;
  avatarUrl: string;
  message?: string;
}

export interface ProfileUpdateData {
  name?: string;
  age?: number;
  city?: string;
  country?: string;
  description?: string;
}

// ============================================
// SERVICIO UNIFICADO
// ============================================

@Injectable({ providedIn: 'root' })
export class UserService {
  // URL base de tu API en Render
  private readonly baseUrl = 'https://habitstracker-api-8g6h.onrender.com/api';

  // URLs específicas
  private readonly authUrl = `${this.baseUrl}/auth`;
  private readonly userUrl = `${this.baseUrl}/user`;

  constructor(private http: HttpClient) {}

  // ============================================
  // MÉTODOS DE AUTENTICACIÓN
  // ============================================

  /**
   * Inicia sesión con email y password
   */
  login(data: LoginPayload): Observable<AuthResponse> {
    const body = {
      email: data.email,
      password: data.password
    };
    return this.http.post<AuthResponse>(`${this.authUrl}/login`, body);
  }

  /**
   * Registra un nuevo usuario
   */
  register(data: RegisterPayload): Observable<any> {
    const body = {
      name: data.name,
      email: data.email,
      password: data.password
    };
    return this.http.post(`${this.authUrl}/register`, body);
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {});
  }

  /**
   * Verifica si el token es válido
   */
  verifyToken(token: string): Observable<{ valid: boolean; user?: UsersModel }> {
    return this.http.get<{ valid: boolean; user?: UsersModel }>(
      `${this.authUrl}/verify`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }
    );
  }

  // ============================================
  // MÉTODOS DE PERFIL
  // ============================================

  /**
   * Obtiene la información del perfil del usuario autenticado
   */
  getUserProfile(): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.userUrl}/profile`);
  }

  /**
   * Actualiza la información del perfil del usuario
   */
  updateProfile(profileData: ProfileUpdateData): Observable<any> {
    return this.http.put(`${this.userUrl}/profile`, profileData);
  }

  /**
   * Obtiene el perfil de un usuario por ID (público o admin)
   */
  getUserById(userId: string): Observable<UsersModel> {
    return this.http.get<UsersModel>(`${this.userUrl}/${userId}`);
  }

  // ============================================
  // MÉTODOS DE AVATAR
  // ============================================

  /**
   * Sube un nuevo avatar para el usuario
   * @param formData FormData con el archivo de imagen (key: 'avatar')
   */
  uploadAvatar(formData: FormData): Observable<AvatarUploadResponse> {
    return this.http.post<AvatarUploadResponse>(
      `${this.userUrl}/avatar`,
      formData
      // No agregar Content-Type, FormData lo maneja automáticamente
    );
  }

  /**
   * Elimina el avatar del usuario
   */
  deleteAvatar(): Observable<any> {
    return this.http.delete(`${this.userUrl}/avatar`);
  }

  // ============================================
  // MÉTODOS DE PASSWORD (OPCIONALES)
  // ============================================

  /**
   * Solicita recuperación de contraseña
   */
  requestPasswordReset(email: string): Observable<any> {
    return this.http.post(`${this.authUrl}/forgot-password`, { email });
  }

  /**
   * Resetea la contraseña con un token
   */
  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.authUrl}/reset-password`, {
      token,
      newPassword
    });
  }

  /**
   * Cambia la contraseña del usuario autenticado
   */
  changePassword(currentPassword: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.userUrl}/change-password`, {
      currentPassword,
      newPassword
    });
  }
}
