// services/item.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/interfaces';

@Injectable({ providedIn: 'root' })
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items'; // URL твоей подруги

  constructor(private http: HttpClient) {}

  // Получить все вещи (для Item-List)
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }

  // Получить одну вещь по ID (для Item-Detail)
  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}/${id}/`);
  }
  createItem(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }
}