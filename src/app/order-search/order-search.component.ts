import { Component } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { Order } from '../models/order';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.scss'],
})
export class OrderSearchComponent {
    public orders$: Observable<Order[]> = of([]);
    public step = 0;
    public panelOpenState = false;
    public displayedColumns: string[] = ['quantity', 'name', 'price'];

    constructor(private orderServce: OrderService, private loadingService: LoadingService, private authService: AuthService) {
        // TODO: uncomment
        // if (!this.authService.currentUser) return;
        setTimeout(() => this.loadingService.show(), 0);
        this.orders$ = this.orderServce.getHistory().pipe(
            map((orders) => {
                orders.map((order) => {
                    order.total = 0;
                    for (const item of order.items) {
                        order.total += item.quantity * item.item.price;
                    }
                });
                return orders;
            }),
            tap(() => setTimeout(() => this.loadingService.hide(), 0))
        );
    }

    public setStep(index: number) {
        this.step = index;
    }

    public nextStep() {
        this.step++;
    }

    public prevStep() {
        this.step--;
    }
}
