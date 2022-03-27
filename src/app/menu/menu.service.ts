import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Menu, MenuItem } from '../models/menu';
import { Order } from '../models/order';
import { AddOrder, RemoveOrder } from '../store/action/order.actions';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private store: Store<AppState>, private httpClient: HttpClient) {}

  public addOrder(order: Order): void {
    this.store.dispatch(new AddOrder(order));

    // submit data to server
  }

  public getOrder(): Observable<Order> {
    this.store.select('order');

    // get order from the server, return latest

    return of();
  }

  public getMenu(): Observable<Menu> {
    this.store.select('menu');

    return of(
      new Menu({
        items: [
          new MenuItem({ imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 }),
          new MenuItem({ imageUrl: './assets/dal.jpg', price: 10.99, description: 'Lentil Dal Curry', name: 'Dal Curry', available: 25 }),
          new MenuItem({ imageUrl: './assets/naan.jpg', price: 4.99, description: 'Naan Bread', name: 'Naan', available: 25 })
        ]
      })
    );
    // return this.http.get<Menu>(this.menuUrl);
  }

  public submitOrder(order: Order): Observable<any> {
    // TODO: remove item from the store?
    // this.store.dispatch(new RemoveOrder(1));
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
