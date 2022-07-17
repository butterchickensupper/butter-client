import { Component, OnDestroy } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { map, Subscription, tap } from 'rxjs';

import { Order } from '../models/order';
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
    public displayedColumns = ['created', 'name', 'items', 'total'];
    public dataSource: Order[] = [];
    public searchForm = this.formBuilder.group({
        date: ['', Validators.required],
    });

    private get date(): Date | undefined {
        const v = this.searchForm.get('date')?.value;
        if (!v) return undefined;
        return new Date(v);
    }

    constructor(private formBuilder: UntypedFormBuilder, private loadingService: LoadingService, private orderService: OrderService) {}

    ngOnDestroy(): void {
        this.subscriptions.map((res) => res.unsubscribe());
    }

    public search() {
        const d = this.date;
        if (!d) return;
        setTimeout(() => this.loadingService.show(), 0);
        this.subscriptions.push(
            this.orderService
                .search(new OrderSearchRequest({ startDate: d }))
                .pipe(
                    map((res) => {
                        this.dataSource = res;
                    }),
                    tap(() => setTimeout(() => this.loadingService.hide(), 0))
                )
                .subscribe()
        );
    }

    public clear(): void {}
}
