import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderHistoryRequest } from 'src/app/models/order-history-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private httpClient: HttpClient) {}

    public submitOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>(environment.apiGatewayUrl + 'order', order);
    }

    public getHistory(request: OrderHistoryRequest): Observable<Order[]> {
        console.log(request);
        return this.httpClient.get<Order[]>('/assets/orders.json').pipe(
            map((a) => {
                a.forEach((b) => {
                    if (b.createdAt) b.createdAt = new Date(b.createdAt);
                    if (b.updatedAt) b.updatedAt = new Date(b.updatedAt);
                });
                return a;
            })
        );
    }
}
