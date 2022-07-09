import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderHistoryRequest } from 'src/app/models/order-history-request';
import { environment } from 'src/environments/environment';

import { CartService } from '../cart/cart.service';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private httpClient: HttpClient, private cartService: CartService) {}

    public submitOrder(order: Order): Observable<any> {
        return this.httpClient.post(environment.apiGatewayUrl + 'order', order);
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
}
