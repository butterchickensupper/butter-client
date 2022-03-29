import { AddOrder, ClearOrders, RemoveOrder } from '../store/action/order.actions';
import { MenuOrder, Order } from '../models/order';
import { Observable, of } from 'rxjs';

import { IAppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private store: Store<IAppState>) {}

  public submitOrder(order: Order): Observable<any> {
    // submit data to server
    return of();
  }

  public getOrders(): Observable<Order[]> {
    return of([
      new Order({ name: 'John', address: '123 Main St', items: [], date: new Date(2022, 1, 12, 6, 23) }),
      new Order({ name: 'John', address: '123 Main St', items: [], date: new Date(2021, 5, 12, 3, 22) }),
      new Order({ name: 'John', address: '123 Main St', items: [], date: new Date(2020, 4, 12, 1, 1) })
    ]);
  }

  public addMenuOrder(order: MenuOrder): void {
    this.store.dispatch(new AddOrder(order));
    // submit data to server
  }

  public removeMenuOrder(index: number): void {
    // submit data to server
    this.store.dispatch(new RemoveOrder(index));
  }

  public getMenuOrders(): Observable<MenuOrder[]> {
    // data to server, set store
    return this.store.select('order');
  }

  public clearMenuOrders(): Observable<any> {
    // submit data to server
    this.store.dispatch(new ClearOrders());
    return of();
  }
}
