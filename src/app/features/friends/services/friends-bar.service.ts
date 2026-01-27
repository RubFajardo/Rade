import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class FriendsService {
  private apiUrl = 'http://localhost:8080/api/friends';

  constructor(private http: HttpClient) {
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

  getFriends(): Observable<any> {
    return this.http.get(`${this.apiUrl}/getFriends`);
  }

}
