import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../services/item'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-item',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './post-item.html',
  styleUrls: ['./post-item.css']
})
export class PostItemComponent {
  // Поля формы, которые будут связаны через [(ngModel)]
  title: string = '';
  description: string = '';
  status: string = 'lost';
  category: string = '';
  location: string = '';

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private itemService: ItemService ,private router:Router) {}

  // Обработка выбора файла
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

  // Удаление выбранного фото
  removeImage(event: Event) {
    event.stopPropagation();
    this.selectedFile = null;
    this.imagePreview = null;
  }

  // Отправка формы
  submitForm() {
    // 1. Создаем объект FormData для отправки файлов и текста
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    const formattedType = this.status.charAt(0).toUpperCase() + this.status.slice(1); 
    formData.append('item_type', formattedType);
    formData.append('category', this.category);
    formData.append('location', this.location);
    if (this.selectedFile) {
      formData.append('imageUrl', this.selectedFile, this.selectedFile.name);
    }

    // 2. Отправляем через сервис с обработкой типов
    this.itemService.createItem(formData).subscribe({
      next: (response: any) => {
        console.log('Успешно отправлено:', response);
        alert('Объявление успешно создано!');
        this.resetForm();
        this.router.navigate(['/']);
      },
      error: (error: any) => {
        console.error('Ошибка при отправке:', error);
        alert('Произошла ошибка при сохранении объявления.');
      }
    });
  }

  // Очистка формы после успеха
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