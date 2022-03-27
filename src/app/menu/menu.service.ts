import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Menu, MenuItem } from '../models/menu';
import { MenuOrder, Order } from '../models/order';
import { AddOrder, ClearOrders, RemoveOrder } from '../store/action/order.actions';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private store: Store<AppState>, private httpClient: HttpClient) {}

  public addOrder(order: MenuOrder): void {
    this.store.dispatch(new AddOrder(order));

    // submit data to server
  }

  public removeOrder(index: number): void {
    this.store.dispatch(new RemoveOrder(index));
  }

  public getOrders(): Observable<MenuOrder[]> {
    this.store.select('orders').subscribe((res) => {
      console.log('orders');
      console.log(res);
    });

    // get orders from the server, return latest

    return of();
  }

  public clearOrders(): Observable<any> {
    this.store.dispatch(new ClearOrders());
    return of();
  }

  public getMenu(): Observable<Menu> {
    // this.store.select('menuItems');

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
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
