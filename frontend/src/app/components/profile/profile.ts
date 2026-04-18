import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { User, Item } from '../../models/interfaces';


type ModalType = 'claims' | 'edit' | 'view-my-claim' | 'edit-my-claim';


@Component({
 selector: 'app-profile',
 standalone: true,
 imports: [CommonModule, FormsModule],
 templateUrl: './profile.html',
 styleUrls: ['./profile.css']
})
export class ProfileComponent implements OnInit {
 user: User | null = null;
 showModal = false;
 modalType: ModalType = 'claims';
 currentImgIndex = 0;
 selectedItem: any = null;
 enlargedImage: string | null = null;




 // Левая колонка: Вещи, которые нашла ТЫ
 myClaims = [
 { id: 101, title: 'AirPods Pro 2', date: '14.04.2026', status: 'available',
 images: [{ image_url: 'https://placehold.co/600x400?text=AirPods' }]
 },
 {
     id: 102, title: 'Student Card', date: '15.04.2026', status: 'under_review',
     images: [{ image_url: 'assets/stc.jpeg' }]
   }
 ];


 // Правая колонка: Твои заявки на чужие находки
 mySentRequests = [
   {
     id: 99, title: 'Samsung Powerbank', date: '16.04.2026', status: 'pending',
     images: [
       { image_url: 'assets/samsung.jpeg' },
       { image_url: 'assets/samsung2.jpeg' }
     ]
   }
 ];


 constructor(private authService: AuthService) {}


 ngOnInit() {
   this.user = this.authService.getCurrentUser();
 }


 openModal(item: any, type: ModalType) {
   this.selectedItem = item;
   this.modalType = type;
   this.currentImgIndex = 0;
   this.showModal = true;
 }


 openImageFull(url: string) {
   this.enlargedImage = url;
 }


 closeImageFull() {
   this.enlargedImage = null;
 }


 closeModal() {
   this.showModal = false;
 }
}
