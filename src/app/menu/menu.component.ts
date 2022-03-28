import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuOrder } from '../models/order';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChildren('viewer') items?: QueryList<MenuItemViewerComponent>;
  public adminMode = false;
  public menu!: Menu;

  constructor(public router: Router, private menuService: MenuService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((res) => {
      this.menu = res;
    });
  }

  public add(order: MenuOrder): void {
    this.menuService.addOrder(order);
    this.snackBar.open('Item Added!', 'Dismiss', { duration: 3 * 1000 });
  }

  public onRemove(id: any): void {
    console.log(id);
  }
}
