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
    if (data && data !== "undefined") {
      try {
        return JSON.parse(data);
      } catch (e) {
        console.error("Ошибка парсинга юзера", e);
        return null;
      }
    }
    return null;
  }
  getCurrentUser(): User | null {
    return this.currentUser();
  }
  login(userData: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/token/`, userData).pipe(
      tap(response => {
        // Эти действия выполнятся только при успешном ответе
        localStorage.setItem('auth_token', response.access);
        if (response.user) {
          localStorage.setItem('user_data', JSON.stringify(response.user));
          this.currentUser.set(response.user);
        } else {
          // Если юзера нет в ответе, можно сохранить хотя бы почту из формы
          const mockUser = { email: userData.email } as User;
          localStorage.setItem('user_data', JSON.stringify(mockUser));
          this.currentUser.set(mockUser);
        }
      })
    );
  }
  register(userData: User): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/register/`, userData);
  }
  logout() {
    localStorage.clear();
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }


}