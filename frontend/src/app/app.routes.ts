import { Routes } from '@angular/router';
import { ItemListComponent } from './components/item-list/item-list';
import { PostItemComponent } from './components/post-item/post-item';
import { LoginComponent } from './components/login/login';
export const routes: Routes = [
 { path: 'login', component: LoginComponent },
 { path: '', component: ItemListComponent }, 
 { path: 'post', component: PostItemComponent }, 
 { path: '**', redirectTo: '' }
];
