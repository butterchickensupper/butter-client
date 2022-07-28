import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Subscription, tap } from 'rxjs';

import { Order } from '../models/order';
import { OrderSearchRequest } from '../models/order-search-request';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnDestroy, OnInit {
    private subscriptions: Subscription[] = [];
    public displayedColumns = ['created', 'name', 'items', 'total'];
    public dataSource: Order[] = [];

    constructor(private loadingService: LoadingService, private orderService: OrderService) {}

    ngOnInit(): void {
        this.search();
    }

    ngOnDestroy(): void {
        this.subscriptions.map((res) => res.unsubscribe());
    }

    public search() {
        this.loadingService.show();
        this.subscriptions.push(
            this.orderService
                .search(new OrderSearchRequest({ startDate: new Date() }))
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
        // show order on map
        console.log(order.billingInfo.address);
    }

    public clear(): void {
        // reset the map
    }
}
