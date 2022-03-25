import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Menu, MenuItem } from './models/menu';
import { MenuViewerComponent } from './menu-viewer/menu-viewer.component';
import { Order } from './models/order';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChildren('viewer') items?: QueryList<MenuViewerComponent>;
  public adminMode = false;
  public menu: Menu = new Menu({ items: [new MenuItem({ imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken' })] });
  public order: Order = new Order();

  constructor() {}

  ngOnInit(): void {
    console.log('init');
  }

  public submitOrder(): void {
    if (!this.items) {
      console.log('items is null');
      return;
    }

    this.items.forEach((i) => {
      if (i.order) {
        this.order.orders.push(i.order);
      }
    });

    // submit the order
    console.log(this.order);
    this.reset();
  }

  public reset(): void {
    this.order = new Order();
  }
}
