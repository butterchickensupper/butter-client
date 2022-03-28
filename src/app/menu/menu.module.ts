import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorComponent } from '../editor/editor.component';
import { EditItemComponent } from '../editor/edit-item/edit-item.component';
import { CartComponent } from './cart/cart.component';
import { MenuComponent } from './menu.component';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderDashboardComponent } from './order-dashboard/order-dashboard.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';

@NgModule({
  declarations: [EditorComponent, EditItemComponent, CartComponent, MenuComponent, MenuItemViewerComponent, OrderHistoryComponent, OrderDashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    ReactiveFormsModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatSnackBarModule,
    GooglePlaceModule
  ],
  exports: [EditorComponent, EditItemComponent, CartComponent, MenuComponent, MenuItemViewerComponent, OrderHistoryComponent]
})
export class MenuModule {}
