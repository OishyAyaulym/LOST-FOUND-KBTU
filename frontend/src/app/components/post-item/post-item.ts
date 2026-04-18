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
  title: string = '';
  description: string = '';
  status: string = 'lost';
  category: string = 'other';
  location: string = '';

  // Массивы для хранения файлов и их превью
  selectedFiles: File[] = [];
  imagePreviews: (string | ArrayBuffer | null)[] = [];

  constructor(private itemService: ItemService, private router: Router) {}

  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        this.selectedFiles.push(file);

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreviews.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number, event: Event) {
    event.stopPropagation();
    this.selectedFiles.splice(index, 1);
    this.imagePreviews.splice(index, 1);
  }

  submitForm() {
    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('location', this.location);
    formData.append('category', this.category);
    
    const formattedType = this.status.charAt(0).toUpperCase() + this.status.slice(1); 
    formData.append('type', formattedType); 

    // Добавляем все файлы в FormData под одним ключом (обычно 'images' или 'images[]')
    this.selectedFiles.forEach((file) => {
      formData.append('images', file, file.name); 
    });

    this.itemService.createItem(formData).subscribe({
      next: () => {
        alert('Success!');
        this.router.navigate(['/']);
      },
      error: (err) => console.error(err)
    });
  }
}