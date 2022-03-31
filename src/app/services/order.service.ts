import { MenuOrder, Order } from '../models/order';
import { Observable, of } from 'rxjs';

import { Injectable } from '@angular/core';
import { MenuItem } from '../models/menu';
import { OrdersRequest } from '../models/orders-request';
import { db } from '../db/app.db';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor() {}

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
        total: 8.99 * 1.06,
        date: new Date(2022, 1, 12, 6, 23)
      }),
      new Order({
        name: 'John',
        address: '456 West Rd',
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
        total: (10.99 * 3 + 4.99 * 2) * 1.06,
        date: new Date(2021, 5, 12, 3, 22)
      }),
      new Order({ name: 'John', address: '123 Main St', items: [], date: new Date(2020, 4, 12, 1, 1) })
    ]);
  }

  public addMenuOrder(order: MenuOrder): Observable<string> {
    console.log(order);
    return db.updateOrder(order);
  }

  public removeMenuOrder(id: string): Observable<number> {
    return db.deleteOrder(id);
  }

  public getMenuOrders(): Observable<MenuOrder[]> {
    return db.getCart();
  }

  public clearMenuOrders(): Observable<void> {
    return db.resetCart();
  }
}
