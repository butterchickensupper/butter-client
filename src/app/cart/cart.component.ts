import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { MenuOrder, Order } from '../models/order';
import { User } from '../models/user';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public orders$: Observable<MenuOrder[]>;
    public orders: MenuOrder[] = [];

    constructor(public fb: UntypedFormBuilder, private orderService: OrderService) {
        this.orders$ = this.orderService.getMenuOrders();
    }

    ngOnInit(): void {
        this.orders$.subscribe((a) => {
            this.orders = a;
        });
    }

    public getTotal(): number | undefined {
        if (!this.orders) return undefined;
        let total = 0.0;
        this.orders.forEach((i) => {
            total += i.item.price * i.quantity;
        });
        return total;
    }

    public submitOrder(): void {
        if (!this.orders) {
            console.log('orders are null');
            return;
        }

        var o = new Order({
            user: new User({ firstName: 'John', lastName: 'Smith', address: '123 Main St', city: 'Livonia', state: 'MI', zip: '48154' }),
            items: this.orders,
            date: new Date(),
        });
        this.orderService.submitOrder(o).subscribe((res) => {
            console.log(res);
        });

        // clear order from store
        console.log(o);
        this.orderService.clearMenuOrders();
    }

    public cancel(): void {
        // clear order from the store/server
    }

    public onOrder(): void {
        // submit order to the service
    }

    public onEdit(order: MenuOrder): void {
        this.orderService.addMenuOrder(order);
    }

    public onDelete(itemId: any): void {
        this.orderService.removeMenuOrder(itemId);
    }
}
