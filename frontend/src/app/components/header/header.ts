import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth'; // Проверь путь к сервису

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  
  // Внедряем AuthService как public, чтобы обращаться к нему из HTML
  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout(); // Очищаем данные (localStorage)
    this.router.navigate(['/login']); // Уходим на страницу логина
  }
}
