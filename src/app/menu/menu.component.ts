import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Menu } from '../models/menu';
import { MenuViewerComponent } from './menu-viewer/menu-viewer.component';
import { Order } from '../models/order';
import { MenuAgent } from './menu.agent';
import { Router } from '@angular/router';
import { OrderState } from '../store/reducer/order.reducer';
import { Store } from '@ngrx/store';
import { addOrder } from '../store/action/order.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @ViewChildren('viewer') items?: QueryList<MenuViewerComponent>;
  public adminMode = false;
  public menu!: Menu;
  public order: Order = new Order();

  constructor(public menuAgent: MenuAgent, public router: Router, private store: Store<OrderState>) {}

  ngOnInit(): void {
    this.menuAgent.getMenu().subscribe((res) => {
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
    this.store.dispatch(addOrder(this.order));
    this.router.navigate(['cart']);
  }

  public reset(): void {
    this.order = new Order();
  }
}
