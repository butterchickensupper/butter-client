import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order';
import { OrderHistoryRequest } from '../models/order-history-request';
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

    constructor(private orderServce: OrderService) {
        // TODO: get userId from context? claims?
        this.orders$ = this.orderServce.getHistory(new OrderHistoryRequest({ userId: 'test123' }));
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
