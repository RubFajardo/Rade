import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
export class FriendsService {
  private apiUrl = 'https://habitstracker-api-8g6h.onrender.com/api/friends';

  constructor(private http: HttpClient) {
  }

  acceptFriend(requestId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/request/${requestId}/accept`, {});
  }

  rejectFriend(requestId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/request/${requestId}/reject`, {});
  }

  getFriends(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${userId}/friends`);
  }

}
