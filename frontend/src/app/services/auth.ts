import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { tap } from 'rxjs/operators';
import { User } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api';
  currentUser = signal<User | null>(this.getUserFromStorage());
  constructor(private http: HttpClient) {}
  private getUserFromStorage(): User | null {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }
  getCurrentUser(): User | null {
    return this.currentUser();
  }
  login(userData: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/token/`, userData).pipe(
      tap(response => {
        // Эти действия выполнятся только при успешном ответе
        localStorage.setItem('auth_token', response.access);
        localStorage.setItem('user_data', JSON.stringify(response.user));
        this.currentUser.set(response.user);
      })
    );
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }


}