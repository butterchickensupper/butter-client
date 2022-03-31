import { AddOrder, ClearOrders, RemoveOrder } from '../store/action/order.actions';
import { MenuOrder, Order } from '../models/order';
import { Observable, of } from 'rxjs';

import { IAppState } from '../store/app.state';
import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu';
import { OrdersRequest } from '../models/orders-request';
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

  public getOrders(request: OrdersRequest): Observable<Order[]> {
    console.log(request);
    return of([
      new Order({
        name: 'John',
        address: '123 Main St',
        items: [
          new MenuOrder({
            quantity: 1,
            item: new MenuItem({
              id: '5',
              imageUrl: './assets/samosa.jpg',
              price: 8.99,
              description: 'Potato and Pea Samosa',
              name: 'Veggie Samosa',
              available: 27
            })
          })
        ],
        date: new Date(2022, 1, 12, 6, 23)
      }),
      new Order({
        name: 'John',
        address: '123 Main St',
        items: [
          new MenuOrder({
            quantity: 3,
            item: new MenuItem({
              id: '2',
              imageUrl: './assets/dal.jpg',
              price: 10.99,
              description: 'Lentil Dal Curry',
              name: 'Dal Curry',
              available: 25
            })
          }),
          new MenuOrder({
            quantity: 2,
            item: new MenuItem({
              id: '3',
              imageUrl: './assets/naan.jpg',
              price: 4.99,
              description: 'Naan Bread',
              name: 'Naan',
              available: 25
            })
          })
        ],
        date: new Date(2021, 5, 12, 3, 22)
      }),
      new Order({ name: 'John', address: '123 Main St', items: [], date: new Date(2020, 4, 12, 1, 1) })
    ]);
  }

  public addMenuOrder(order: MenuOrder): void {
    this.store.dispatch(new AddOrder(order));
    // submit data to server
  }

  public removeMenuOrder(index: string): void {
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
