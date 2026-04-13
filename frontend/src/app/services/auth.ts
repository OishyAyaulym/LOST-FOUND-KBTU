import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Используем Signal для мгновенного обновления имени в шапке
  currentUser = signal<string | null>(localStorage.getItem('user_name'));

  constructor() {}

  // Имитация входа
  login(name: string) {
    localStorage.setItem('user_name', name);
    localStorage.setItem('auth_token', 'fake-jwt-token-kbtu');
    this.currentUser.set(name);
  }

  // Настоящая логика выхода
  logout() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
  }

  // Проверка: залогинен ли пользователь
  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
