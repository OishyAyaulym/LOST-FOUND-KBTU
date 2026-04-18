import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, Location } from '@angular/common';
import { Claim, Comment, Item } from '../../models/interfaces';
import { ItemService } from '../../services/item'; // Сервис для получения данных
import { ClaimService } from '../../services/claim';

@Component({
  selector: 'app-item-detail',
  standalone: true,
  templateUrl: './item-detail.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./item-detail.css']
})
export class ItemDetailComponent implements OnInit {
  selectedItem: Item | undefined;
  alreadyClaimed: boolean = false;
  currentIndex: number = 0;

  newClaim: Partial<Claim> = { description: '' };
  comments: Comment[] = [];
  newCommentText: string = '';

  constructor(
    private route: ActivatedRoute,
    private itemService: ItemService,
    private claimService: ClaimService,
    private location: Location
  ) {}

  ngOnInit(): void {
  const itemId = Number(this.route.snapshot.paramMap.get('id'));

  this.itemService.getItemById(itemId).subscribe({
    next: (data) => {
      this.selectedItem = data;
      this.currentIndex = 0;
      // Если images пришел как undefined, превращаем в пустой массив, чтобы .length не ломался
      if (!this.selectedItem.images) {
        this.selectedItem.images = [];
      }
    },
    error: (err) => {
      console.error('Load error:', err);
      this.location.back();
    }
  });
}

  // Безопасное переключение
  nextImage() {
    if (this.selectedItem?.images && this.selectedItem.images.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.selectedItem.images.length;
    }
  }

  prevImage() {
    if (this.selectedItem?.images && this.selectedItem.images.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.selectedItem.images.length) % this.selectedItem.images.length;
    }
  }

  goBack() { this.location.back(); }

  submitClaim() {
    if (!this.newClaim.description || !this.selectedItem) return;
    const claimData: Claim = {
      item: this.selectedItem.id!,
      description: this.newClaim.description,
      status: 'pending'
    };
    this.claimService.createClaim(claimData).subscribe(() => {
      this.alreadyClaimed = true;
      alert('Claim sent!');
    });
  }

  postComment() {
    if (!this.newCommentText.trim()) return;
    this.comments.push({ authorName: 'Student', text: this.newCommentText } as any);
    this.newCommentText = '';
  }
}