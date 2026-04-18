import { Injectable, signal } from '@angular/core';
import { User } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Сигнал теперь хранит объект User
  currentUser = signal<User | null>(this.getUserFromStorage());

  private getUserFromStorage(): User | null {
    const data = localStorage.getItem('user_data');
    return data ? JSON.parse(data) : null;
  }

  // Метод для компонента Profile
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  login(userData: User) {
    localStorage.setItem('user_data', JSON.stringify(userData));
    localStorage.setItem('auth_token', 'fake-token');
    this.currentUser.set(userData);
  }

  logout() {
    localStorage.clear();
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }


}