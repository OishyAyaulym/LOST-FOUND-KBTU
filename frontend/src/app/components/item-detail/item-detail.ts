import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../services/claim';
import { AuthService } from '../../services/auth';
import { Claim } from '../../models/interfaces';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './item-detail.html',
  styleUrls: ['./item-detail.css']
})
export class ItemDetailComponent implements OnInit {
  item: any; // Данные о вещи, которые приходят от API (там есть id)
  claimDescription: string = '';
  isMyPost: boolean = false;
  hasAlreadyClaimed: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private claimService: ClaimService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    // Здесь должен быть твой код загрузки данных вещи по ID из URL
    // Допустим, после загрузки: this.item = data;
  }

  sendClaim() {
    if (!this.claimDescription.trim()) {
      alert('Пожалуйста, введите описание!');
      return;
    }

    // Собираем объект ТОЧНО как ждет ClaimSerializer
    const newClaim: Claim = {
      itemId: this.item.id,          // Ключ itemId из сериализатора
      description: this.claimDescription
    };

    this.claimService.createClaim(newClaim).subscribe({
      next: (response) => {
        alert(`Заявка успешно отправлена! Статус: ${response.status}. Дата: ${response.date}`);
        this.claimDescription = '';
        this.hasAlreadyClaimed = true;
      },
      error: (err) => {
        console.error('Ошибка при отправке:', err);
        alert('Произошла ошибка. Проверьте консоль разработчика.');
      }
    });
  }
}