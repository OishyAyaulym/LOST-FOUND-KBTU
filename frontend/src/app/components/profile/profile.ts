import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../../services/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
  // Данные пользователя
  user: any = null;

  // Твои мок-данные для красивого списка (Claims)
  // Мы используем их, чтобы страница не была пустой
  myClaims = [
    { 
      id: 1, 
      title: 'AirPods Pro 2 (Case)', 
      date: '14.04.2026', 
      status: 'Approved',
      location: 'Canteen' 
    },
    { 
      id: 2, 
      title: 'Student Card (ID)', 
      date: '15.04.2026', 
      status: 'Pending',
      location: 'Library' 
    },
    { 
      id: 3, 
      title: 'Black Wallet', 
      date: '16.04.2026', 
      status: 'Rejected',
      location: '1st Floor Hall' 
    }
  ];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    }
  }
