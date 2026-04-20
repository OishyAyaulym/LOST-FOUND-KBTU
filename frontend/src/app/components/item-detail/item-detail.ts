import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ClaimService } from '../../services/claim';
import { AuthService } from '../../services/auth';
import { Claim } from '../../models/interfaces';
import { ItemService } from '../../services/item';
import { ChangeDetectorRef } from '@angular/core';

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
    private itemService: ItemService,
    public authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const idFromUrl = Number(this.route.snapshot.paramMap.get('id'));
    console.log('ID из URL:', idFromUrl);

    if (idFromUrl) {
      this.itemService.getItems().subscribe({
        next: (allData: any[]) => {
          console.log('Все данные с сервера:', allData);
          
          // Ищем предмет. Важно: проверяем, что id совпадает
          this.item = allData.find(i => Number(i.id) === idFromUrl);
          
          if (this.item) {
            console.log('Предмет найден!', this.item);
            const currentUsername = localStorage.getItem('username');
            this.isMyPost = (this.item.postedBy === currentUsername);
          } else {
            console.warn('Предмет с таким ID не найден в списке');
          }
          
          this.cdr.detectChanges(); // Если импортировала ChangeDetectorRef
        },
        error: (err) => console.error('Ошибка загрузки данных:', err)
      });
    }
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