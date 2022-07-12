import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { Order } from '../models/order';
import { OrderHistoryRequest } from '../models/order-history-request';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-order-history',
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.scss'],
})
export class OrderHistoryComponent {
    public orders$: Observable<Order[]>;
    public step = 0;
    public panelOpenState = false;
    public displayedColumns: string[] = ['quantity', 'name', 'price'];

    constructor(private orderServce: OrderService, private loadingService: LoadingService) {
        setTimeout(() => this.loadingService.show(), 0);
        this.orders$ = this.orderServce
            .getHistory(new OrderHistoryRequest({ userId: 'test123' }))
            .pipe(tap(() => setTimeout(() => this.loadingService.hide(), 0)));
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
