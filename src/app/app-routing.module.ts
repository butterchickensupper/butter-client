import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { EditItemComponent } from './menu/edit-item/edit-item.component';
import { EditorComponent } from './menu/editor/editor.component';
import { MenuComponent } from './menu/menu.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'edit-menu', component: EditorComponent }, //TODO: add guard
  { path: 'edit-item', component: EditItemComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
