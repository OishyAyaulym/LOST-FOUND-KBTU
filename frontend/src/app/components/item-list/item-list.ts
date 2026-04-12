import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent {
  // Названия полей должны быть такими же, как в HTML (category_name)
  allItems = [
    { id: 1, title: 'Наушники Apple Airpods Pro 2', category_name: 'Electronics', location: 'Панфилов 2, Room 218', status: 'lost', created_at: '2026-04-09', image_url: 'assets/1.jpg'},
    { id: 2, title: 'Мышь LOGITECH черный', category_name: 'Electronics', location: 'Абылайхан 2,Room 283', status: 'lost', created_at: '2026-04-10', image_url: 'assets/2.jpg' },
    { id: 3, title: 'Ключи', category_name: 'Keys', location: 'Возле 461 кабинета', status: 'returned', created_at: '2026-04-06', image_url: 'assets/3.jpg' },
    { id: 4, title: 'Зарядка USB-Lighting для iPhone', category_name: 'Electronics', location: 'Абылайхан 3,Room 365', status: 'found', created_at:'2026-03-30', image_url: 'assets/4.jpg' },

    { id: 5, title: 'Сережки', category_name: 'Other', location: 'Room 461', status: 'lost', created_at: '2026-04-01', image_url: 'assets/5.jpg'},
    { id: 6, title: 'Фломастеры', category_name: 'Documents', location: 'Room 303', status: 'found', created_at: '2026-03-29', image_url: 'assets/6.jpg' },
    { id: 7, title: 'Очки для зрение', category_name: 'Clothing', location: 'Room 284', status: 'found', created_at: '2026-04-08', image_url: 'assets/7.jpg' },
    { id: 8, title: 'Бутылка', category_name: 'Other', location: 'В спортзале общаги', status: 'found', created_at: '2026-03-28', image_url: 'assets/8.jpg' },

    { id: 9, title: 'Шапка коричневая', category_name: 'Clothing', location: 'Room 451', status: 'found', created_at: '2026-04-09', image_url: 'assets/9.jpg'},
    { id: 10, title: 'Картхолдер', category_name: 'Documents', location: 'Возле кабинета 258', status: 'found', created_at: '2026-04-03', image_url: 'assets/10.jpg' },
    { id: 11, title: 'Карта Онай', category_name: 'Documents', location: 'У охранника общаги возле Тургут Озал', status: 'found', created_at: '2026-04-03', image_url: 'assets/11.jpg' },
    { id: 12, title: 'Зарядка для MacBook', category_name: 'Electronics', location: 'Возле Тб0', status: 'returned', created_at:'2026-04-09', image_url: 'assets/12.jpg' },
  ];

  // То, что фильтруется
  items = [...this.allItems];

  // Убирает красное под applyFilters
  applyFilters(search: string, type: string, category: string) {
    this.items = this.allItems.filter(item => {
      const matchSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
      const matchType = !type || item.status === type;
      const matchCategory = !category || item.category_name.toLowerCase() === category.toLowerCase();
      return matchSearch && matchType && matchCategory;
    });
  }

  // Убирает красное под resetFilters
  resetFilters() {
    this.items = [...this.allItems];
    // Чтобы очистить поля в браузере, можно просто перезагрузить данные
    console.log('Filters reset');
  }
}