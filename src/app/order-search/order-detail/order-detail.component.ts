import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuOrder } from 'src/app/models/order';

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {
    @Input()
    public orders?: MenuOrder[];
    @Output()
    public back = new EventEmitter();

    constructor() {}

    public goBack(): void {
        this.back.emit();
    }

    public getTotal(): number | undefined {
        if (!this.orders) return undefined;
        let total = 0.0;
        this.orders.forEach((i) => {
            total += i.item.price * i.quantity;
        });
        return total;
    }
}
