import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { MenuItem } from '../models/menu';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private selectedItem?: MenuItem;
  public menuItems: MenuItem[] = [
    new MenuItem({ description: 'delicious butter chickens', name: 'Butter Chicken', imageUrl: '', price: 13.99, available: 40 }),
    new MenuItem({ description: 'delicious goat babies', name: 'Lamb Curry', imageUrl: '', price: 15.99, available: 20 })
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('init');
  }

  public selectionChange(change: MatSelectionListChange): void {
    if (change.source._value) {
      this.selectedItem = change.source._value[0] as unknown as MenuItem;
      return;
    }
    console.warn('menuItem is missing', change.source._value);
  }

  public edit(): void {
    if (!this.selectedItem) return;
    this.router.navigateByUrl('edit-item');
  }
}
