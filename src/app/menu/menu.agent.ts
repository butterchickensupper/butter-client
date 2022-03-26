import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Menu, MenuItem } from '../models/menu';
import { Observable, of, share } from 'rxjs';
import { Order } from '../models/order';

@Injectable()
export class MenuAgent {
  private menuUrl = '/menu';
  private orderUrl = '/menu';

  constructor(private http: HttpClient) {}

  public getMenu(): Observable<Menu> {
    return of(new Menu({ items: [new MenuItem({ imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 })] }));
    // return this.http.get<Menu>(this.menuUrl);
  }

  public submitOrder(order: Order): Observable<any> {
    return of();
    // return this.http.post(this.orderUrl, order).pipe(share());
  }
}
