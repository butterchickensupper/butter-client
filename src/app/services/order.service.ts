import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { MenuOrder, Order } from '../models/order';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OrderHistoryRequest } from '../models/order-history-request';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private cart: MenuOrder[] = [];
  public totalItems$ = new BehaviorSubject<number>(0);
  public total$ = new BehaviorSubject<number>(0);

  constructor(private httpClient: HttpClient) {}

  public submitOrder(order: Order): Observable<any> {
    // submit data to server
    return of();
  }

  public getHistory(request: OrderHistoryRequest): Observable<Order[]> {
    console.log(request);
    return this.httpClient.get<Order[]>('/assets/orders.json').pipe(
      map((a) => {
        a.forEach((b) => {
          b.date = new Date(b.date);
        });
        return a;
      })
    );
  }

  public addMenuOrder(order: MenuOrder, fromMenu = false): Observable<string> {
    const i = this.cart.findIndex((x) => x.id === order.id);
    if (i !== -1) {
      if (fromMenu) this.cart[i].quantity += order.quantity;
      else this.cart[i].quantity = order.quantity;
    } else {
      this.cart.push(order);
    }
    this.updateTotals();
    return of('added');
  }

  public removeMenuOrder(id: string): Observable<boolean> {
    const i = this.cart.findIndex((x) => x.id === id);
    if (i === -1) return of(false);
    this.cart.splice(i, 1);
    this.updateTotals();
    return of(true);
  }

  public getMenuOrders(): Observable<MenuOrder[]> {
    return of(this.cart);
  }

  public clearMenuOrders(): Observable<void> {
    this.cart = [];
    this.updateTotals();
    return of();
  }

  private updateTotals(): void {
    let t = 0;
    this.cart.forEach((i) => {
      t += i.quantity;
    });
    this.totalItems$.next(t);
  }
}
