import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { MenuOrder } from '../models/order';
import { OrderService } from '../services/order/order.service';
import { BillingInfoComponent } from './billing-info/billing-info.component';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
    public orderInfo!: BillingInfoComponent;
    public orders$: Observable<MenuOrder[]>;
    public orders: MenuOrder[] = [];

    constructor(public fb: UntypedFormBuilder, private orderService: OrderService, private router: Router) {
        this.orders$ = this.orderService.getMenuOrders();
    }

    ngOnInit(): void {
        this.orders$.subscribe((a) => {
            this.orders = a;
        });
    }

    public goToAccount(): void {
        this.router.navigate(['/account']);
    }

    public getTotal(): number | undefined {
        if (!this.orders) return undefined;
        let total = 0.0;
        this.orders.forEach((i) => {
            total += i.item.price * i.quantity;
        });
        return total;
    }

    public onEdit(order: MenuOrder): void {
        this.orderService.addMenuOrder(order);
    }

    public onDelete(itemId: any): void {
        this.orderService.removeMenuOrder(itemId);
    }
}
