import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  loginData = {
    email: '',
    password: '',
    studentId: '' 
  };

  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService 
  ) {}

  onLogin() {
    const email = this.loginData.email.toLowerCase().trim();
    const studentId = this.loginData.studentId.trim();

    if (!email || !this.loginData.password || !studentId) {
      this.errorMessage = 'Пожалуйста, заполните все поля';
      return;
    }

    if (!email.endsWith('@kbtu.kz')) {
      this.errorMessage = 'Используйте только корпоративную почту @kbtu.kz';
      return;
    }

    this.errorMessage = '';
    

    const userData = {
      id: Date.now(), 
      email: email,
      fullName: email.split('@')[0], 
      studentId: studentId
    };

    this.authService.login(userData); 
    
    console.log('Вход выполнен для:', userData);
    this.router.navigate(['/']); 
  }
}