import { Component, ChangeDetectorRef } from '@angular/core';
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
export class ItemListComponent {
  allItems: any[] = [];
  items: any[] = [];

  constructor(private itemService: ItemService, private router: Router, private cdr: ChangeDetectorRef){}
  ngOnInit(){
    this.loadItems();
  }
  loadItems(){
    this.itemService.getItems().subscribe({
      next: (data)=>{
        console.log('Getting data:', data);
        this.allItems = data;
        this.items = data;
        this.cdr.detectChanges();
      },
      error: (err)=>{
        console.log('Error in getting data:', err);
      }
    });
  }
  applyFilters(search: string, type: string, category: string) {
    this.items = this.allItems.filter(item => {
    const matchesSearch = !search || item.title?.toLowerCase().includes(search.toLowerCase());
    const matchesType = !type || item.type?.toLowerCase() === type.toLowerCase();
    const matchesCategory = !category || item.category?.toLowerCase() === category.toLowerCase();;
    return matchesSearch && matchesType && matchesCategory;
    });
    console.log('Результат фильтрации:', this.items);
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