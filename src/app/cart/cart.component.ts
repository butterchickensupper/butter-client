import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { OrderInfoComponent } from '../core/order-info/order-info.component';
import { MenuOrder, Order } from '../models/order';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    @ViewChild('orderInfo')
    public orderInfo!: OrderInfoComponent;
    public step = 0;
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

    public setStep(index: number): void {
        this.step = index;
    }

    public nextStep(): void {
        this.step++;
    }

    public prevStep(): void {
        this.step--;
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
        const user = this.orderInfo.user;
        if (!user) {
            console.log('user is null');
            return;
        }

        var o = new Order({
            user: user,
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
