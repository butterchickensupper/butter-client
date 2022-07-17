import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { OrderSearchRequest } from 'src/app/models/order-search-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class OrderService {
    constructor(private httpClient: HttpClient) {}

    public submitOrder(order: Order): Observable<Order> {
        return this.httpClient.post<Order>(environment.apiGatewayUrl + 'order', order);
    }

    /**
     * Get all orders for a user
     *
     */
    public getHistory(): Observable<Order[]> {
        return this.httpClient.get<Order[]>(environment.apiGatewayUrl + 'orders').pipe(
            map((a) => {
                a.forEach((b) => {
                    if (b.createdAt) b.createdAt = new Date(b.createdAt);
                    if (b.updatedAt) b.updatedAt = new Date(b.updatedAt);
                });
                return a;
            })
        );
    }

    /**
     * Search for orders by date range
     *
     */
    public search(request: OrderSearchRequest): Observable<Order[]> {
        return this.httpClient.post<Order[]>(environment.apiGatewayUrl + 'search', request).pipe(
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
