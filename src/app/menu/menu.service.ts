import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Menu, MenuItem } from '../models/menu';
import { Order } from '../models/order';
import { addOrder } from '../store/action/order.actions';
import { MenuState } from '../store/reducer/menu.reducer';
import { OrderState } from '../store/reducer/order.reducer';
import { selectMenu } from '../store/selector/menu.selectors';
import { selectOrder } from '../store/selector/order.selectors';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private orderStore: Store<OrderState>, private menuStore: Store<MenuState>, private httpClient: HttpClient) {}

  public addOrder(order: Order): void {
    this.orderStore.dispatch(addOrder(order));

    // submit data to server
  }

  public getOrder(): Observable<Order> {
    this.orderStore.pipe(select(selectOrder));

    // get order from the server, return latest

    return of();
  }

  public getMenu(): Observable<Menu> {
    this.menuStore.pipe(select(selectMenu));

    return of(new Menu({ items: [new MenuItem({ imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 })] }));
    // return this.http.get<Menu>(this.menuUrl);
  }

  public submitOrder(order: Order): Observable<any> {
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
