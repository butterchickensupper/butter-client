import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Menu } from '../models/menu';
import { Order } from '../models/order';
import { Router } from '@angular/router';
import { MenuService } from './menu.service';
import { MenuItemViewerComponent } from './menu-item-viewer/menu-item-viewer.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChildren('viewer') items?: QueryList<MenuItemViewerComponent>;
  public adminMode = false;
  public menu!: Menu;
  public order: Order = new Order();

  constructor(public router: Router, private menuService: MenuService) {}

  ngOnInit(): void {
    this.menuService.getMenu().subscribe((res) => {
      this.menu = res;
    });
  }

  public add(): void {
    if (!this.items) {
      console.log('items is null');
      return;
    }

    this.items.forEach((i) => {
      if (i.order) {
        this.order.items.push(i.order);
      }
    });
    this.menuService.addOrder(this.order);
    this.router.navigate(['cart']);
  }

  public reset(): void {
    this.order = new Order();
  }

  public clear(): void {
    this.items?.forEach((res) => {
      res.reset();
    });
  }
}
