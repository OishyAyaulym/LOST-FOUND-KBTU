import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser = signal<string | null>(localStorage.getItem('user_name'));

  constructor() {}

  login(name: string) {
    localStorage.setItem('user_name', name);
    localStorage.setItem('auth_token', 'fake-jwt-token-kbtu');
    this.currentUser.set(name);
  }

  logout() {
    localStorage.removeItem('user_name');
    localStorage.removeItem('auth_token');
    this.currentUser.set(null);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}
