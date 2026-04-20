import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/interfaces';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private apiUrl = 'http://127.0.0.1:8000/api/items/';

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> { 
    return this.http.get<Item[]>(this.apiUrl);
  }

  getItemById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.apiUrl}${id}/`);
  }

  createItem(data: any): Observable<any> {
  const token = localStorage.getItem('auth_token'); // Достаем токен
  const headers = { 'Authorization': `Bearer ${token}` }; // Создаем заголовок

  return this.http.post(this.apiUrl, data, { headers }); // Отправляем С ЗАГОЛОВКОМ
  }
}