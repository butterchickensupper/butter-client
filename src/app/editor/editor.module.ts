import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorComponent } from './editor.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { menuFeatureKey, reducer } from '../store/reducer/menu.reducer';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [EditorComponent, EditItemComponent],
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
  exports: [EditorComponent, EditItemComponent]
})
export class EditorModule {}
