import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item'; 
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth'

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-item.html',
  styleUrls: ['./post-item.css']
})
export class PostItemComponent {
  title: string = '';
  description: string = '';
  status: string = 'lost';
  category: string = '';
  location: string = '';

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private itemService: ItemService , private authService: AuthService, private router:Router) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.imagePreview = null;
  }

  submitForm() {
    const currentUser = this.authService.currentUser();
    console.log('User data:', this.authService.currentUser());
    
    const itemData = {
      title: this.title,
      description: this.description,
      location: this.location,
      category: Number(this.category), // Шлем ID (цифру)
      type: this.status.charAt(0).toUpperCase() + this.status.slice(1), // Шлем "Type", так как в сериализаторе 'type'
      //finder: 1 ,//currentUser?.id, // Шлем ID пользователя в поле 'finder'
      status: 'available'
    };

    console.log('Данные для отправки:', itemData);

    this.itemService.createItem(itemData).subscribe({
      next: (response) => {
        alert('Ура! Объявление создано!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Ошибка от Django:', err.error);
        alert('Ошибка 400. Проверь детали в консоли.');
      }
    });
  }

  resetForm() {
    this.title = '';
    this.description = '';
    this.status = 'lost';
    this.category = '';
    this.location = '';
    this.selectedFile = null;
    this.imagePreview = null;
  }
}