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

  public addOrder(order: MenuOrder): void {
    this.store.dispatch(new AddOrder(order));
    // submit data to server
  }

  public removeOrder(index: number): void {
    // submit data to server
    this.store.dispatch(new RemoveOrder(index));
  }

  public getOrders(): Observable<MenuOrder[]> {
    // data to server, set store
    return this.store.select('order');
  }

  public clearOrders(): Observable<any> {
    // submit data to server
    this.store.dispatch(new ClearOrders());
    return of();
  }
}
