import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { menuFeatureKey, reducer } from '../store/reducer/menu.reducer';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorComponent } from '../editor/editor.component';
import { EditItemComponent } from '../editor/edit-item/edit-item.component';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu.component';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';
import { OrderHistoryComponent } from './order-history/order-history.component';

@NgModule({
  declarations: [EditorComponent, EditItemComponent, CartComponent, MenuComponent, MenuItemViewerComponent, OrderHistoryComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(menuFeatureKey, reducer),
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule
  ],
  exports: [EditorComponent, EditItemComponent, CartComponent, MenuComponent, MenuItemViewerComponent, OrderHistoryComponent]
})
export class MenuModule {}
