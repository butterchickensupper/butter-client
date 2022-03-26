import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { CartComponent } from './cart.component';
import { orderFeatureKey, reducer } from '../store/reducer/order.reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { MenuViewerComponent } from '../menu/menu-viewer/menu-viewer.component';

@NgModule({
  declarations: [CartComponent, MenuComponent, MenuViewerComponent],
  imports: [CommonModule, StoreModule.forFeature(orderFeatureKey, reducer), MatButtonModule, MatInputModule, MatCheckboxModule, MatCardModule, ReactiveFormsModule],
  exports: [CartComponent, MenuComponent, MenuViewerComponent]
})
export class CartModule {}
