import { Component } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';

import { Order } from '../models/order';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
    public orders$: Observable<Order[]> = of([]);
    public step = 0;
    public panelOpenState = false;
    public displayedColumns: string[] = ['quantity', 'name', 'price'];

    constructor(private orderServce: OrderService, private loadingService: LoadingService, private authService: AuthService) {
        // TODO: uncomment
        // if (!this.authService.currentUser) return;
        this.loadingService.show();
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
            tap(() => this.loadingService.hide())
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
