import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Friends} from '../models/friends.model';

@Injectable({providedIn: 'root'})
export class FriendsService {
  private apiUrl = 'http://localhost:8080/api/friends';

  constructor(private http: HttpClient) {
  }

  sendRequest(receiverId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/request/create/${receiverId}`, {})
  }

  acceptFriend(requestId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/request/${requestId}/accept`, {});
  }

  rejectFriend(requestId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/request/${requestId}/reject`, {});
  }

  getPendingRequests(): Observable<any> {
    return this.http.get(`${this.apiUrl}/request/pending`);
  }

  getFriends(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFriends/${userId}`);
  }

  searchFriends(query: string): Observable<Friends[]> {
    return this.http.get<Friends[]>(`${this.apiUrl}/search`, {
      params: { name: query }
    });
  }

}
