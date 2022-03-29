import { Component, OnInit } from '@angular/core';
import { Menu, MenuItem } from '../models/menu';

import { MatSelectionListChange } from '@angular/material/list';
import { MenuService } from '../menu/menu.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  public selectedItem?: MenuItem;
  public menu$: Observable<Menu | undefined>;
  public menu?: Menu;

  constructor(private router: Router, private menuService: MenuService) {
    this.menu$ = this.menuService.getMenu('default');
  }

  ngOnInit(): void {
    this.menu$.subscribe((a) => {
      this.menu = a;
    });
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
    this.router.navigateByUrl('edit-item/' + this.selectedItem.id);
  }
}
