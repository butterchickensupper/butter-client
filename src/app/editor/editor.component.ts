import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList, MatSelectionListChange } from '@angular/material/list';
import { Menu, MenuItem } from '../models/menu';

import { MenuService } from '../menu/menu.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  @ViewChild('menuList')
  public menuList?: MatSelectionList;

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
    this.router.navigateByUrl(`edit-item/${this.selectedItem?.id ?? ''}`);
  }

  public deleteItem(): void {
    if (!this.selectedItem?.id) {
      console.error('selectedItem?.id is null', this.selectedItem);
      return;
    }
    if (this.menuService.deleteMenuItem('default', this.selectedItem.id)) {
      this.menuList?.deselectAll();
      this.selectedItem = undefined;
    } else {
      console.error('failed to delete menu');
    }
  }
}
