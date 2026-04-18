import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list';
import { PostItemComponent } from './components/post-item/post-item';
import { ItemDetailComponent } from './components/item-detail/item-detail'; // Убедись, что импорт верный
import { ProfileComponent } from './components/profile/profile';
import { LoginComponent } from './components/login/login';
export const routes: Routes = [

  { path: '', component: ItemListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },

  // Детали конкретного предмета (id передается динамически)
  // Именно этот путь нужен для метода viewItemDetails(id)
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'post', component: PostItemComponent },
  { path: '**', redirectTo: '' }
];
