import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemService } from '../../services/item';
import { Item } from '../../models/interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-list.html',
  styleUrls: ['./item-list.css']
})
export class ItemListComponent implements OnInit {

  allItems: any[] = []; // Используем any, если структура из БД чуть отличается
  items: any[] = [];

  constructor(
    private itemService: ItemService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    // Вызываем сервис, который стучится в БД подруги
    this.itemService.getItems().subscribe({
      next: (data) => {
        console.log('Данные из БД получены:', data);
        this.allItems = data;
        this.items = data;
        this.cdr.detectChanges(); // Принудительно обновляем экран
      },
      error: (err) => {
        console.error('Ошибка при получении данных из БД:', err);
      }
    });
  }

  applyFilters(search: string, type: string, category: string) {
    this.items = this.allItems.filter(item => {
      const matchesSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase());
      const matchesType = !type || item.type?.toLowerCase() === type.toLowerCase();
      const matchesCategory = !category || item.category?.toLowerCase() === category.toLowerCase();
      return matchesSearch && matchesType && matchesCategory;
    });
  }

  viewItemDetails(id: number | undefined) {
    if (id) {
      this.router.navigate(['/item', id]);
    }
  }

  resetFilters() {
    this.items = [...this.allItems];
  }
}