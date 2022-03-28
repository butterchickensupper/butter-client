import { AddOrder, ClearOrders, RemoveOrder } from '../store/action/order.actions';
import { Menu, MenuItem } from '../models/menu';
import { MenuOrder, Order } from '../models/order';
import { Observable, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { IAppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private store: Store<IAppState>, private httpClient: HttpClient) {}

  public addOrder(order: MenuOrder): void {
    this.store.dispatch(new AddOrder(order));

    // submit data to server
  }

  public removeOrder(index: number): void {
    this.store.dispatch(new RemoveOrder(index));
  }

  public getOrders(): Observable<MenuOrder[]> {
    return this.store.select('order');
  }

  public clearOrders(): Observable<any> {
    this.store.dispatch(new ClearOrders());
    return of();
  }

  public getMenu(): Observable<Menu> {
    // return this.http.get<Menu>(this.menuUrl);
    return of(
      new Menu({
        items: [
          new MenuItem({ id: '1', imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 }),
          new MenuItem({ id: '2', imageUrl: './assets/dal.jpg', price: 10.99, description: 'Lentil Dal Curry', name: 'Dal Curry', available: 25 }),
          new MenuItem({ id: '3', imageUrl: './assets/naan.jpg', price: 4.99, description: 'Naan Bread', name: 'Naan', available: 25 })
        ]
      })
    );
  }

  public submitOrder(order: Order): Observable<any> {
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
