import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app.state';
import { Menu, MenuItem } from '../models/menu';
import { Order } from '../models/order';
import { AddOrder } from '../store/action/order.actions';

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

    return of(new Menu({ items: [new MenuItem({ imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 })] }));
    // return this.http.get<Menu>(this.menuUrl);
  }

  public submitOrder(order: Order): Observable<any> {
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
