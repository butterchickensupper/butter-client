import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Menu } from '../models/menu';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';
import { MenuOrder } from '../models/order';
import { MenuService } from './menu.service';
import { OrderService } from './order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChildren('viewer') items?: QueryList<MenuItemViewerComponent>;
  public adminMode = false;
  public menu?: Menu;

  constructor(public router: Router, private orderService: OrderService, private menuService: MenuService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.menuService.getMenu('default').subscribe((res) => {
      this.menu = res;
    });
  }

  public add(order: MenuOrder): void {
    this.orderService.addOrder(order);
    this.snackBar.open('Item Added!', 'Dismiss', { duration: 3 * 1000 });
  }

  public onRemove(id: any): void {
    console.log(id);
  }
}
