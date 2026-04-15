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
  
  constructor(
    public authService: AuthService, 
    private router: Router
  ) {}

  onLogout() {
    this.authService.logout(); 
    this.router.navigate(['/login']);
  }
}
