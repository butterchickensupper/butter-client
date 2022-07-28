import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { map, Subscription, tap } from 'rxjs';

import { MenuOrder, Order } from '../models/order';
import { OrderSearchRequest } from '../models/order-search-request';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-order-search',
    templateUrl: './order-search.component.html',
    styleUrls: ['./order-search.component.scss'],
})
export class OrderSearchComponent implements OnDestroy {
    private subscriptions: Subscription[] = [];
    private get date(): Date | undefined {
        const v = this.searchForm.get('date')?.value;
        if (!v) return undefined;
        return new Date(v);
    }

    public displayedColumns = ['created', 'name', 'items', 'total'];
    public dataSource: Order[] = [];
    public searchForm = this.formBuilder.group({
        date: ['', Validators.required],
    });
    public orders: MenuOrder[] | undefined;
    public showDetail = false;

    constructor(private formBuilder: UntypedFormBuilder, private loadingService: LoadingService, private orderService: OrderService) {}

    ngOnDestroy(): void {
        this.subscriptions.map((res) => res.unsubscribe());
    }

    public search() {
        this.searchForm.get('date')?.markAsTouched();
        this.searchForm.updateValueAndValidity();
        const d = this.date;
        if (!d) return;
        this.showDetail = false;
        this.loadingService.show();
        this.subscriptions.push(
            this.orderService
                .search(new OrderSearchRequest({ startDate: d }))
                .pipe(
                    map((res) => {
                        res.map((x) => {
                            var total = 0;
                            x.items.map((i) => {
                                total += i.item.price * i.quantity;
                            });
                            x.total = total;
                        });
                        this.dataSource = res;
                    }),
                    tap(() => this.loadingService.hide())
                )
                .subscribe()
        );
    }

    public showOrder(order: Order) {
        this.showDetail = true;
        this.orders = order.items;
    }

    public showResults(): void {
        this.orders = undefined;
        this.showDetail = false;
    }

    public clear(): void {
        this.dataSource = [];
        this.searchForm.reset();
        this.orders = undefined;
        this.showDetail = false;
    }
}
