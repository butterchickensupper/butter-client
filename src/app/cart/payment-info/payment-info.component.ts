import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { mergeMap, Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { PaymentInfo } from 'src/app/models/payment-info';
import { OrderService } from 'src/app/services/order/order.service';
import { clearOrder } from 'src/app/store/actions/order.action';
import { AppState } from 'src/app/store/models/app-state.model';
import { orderSelector } from 'src/app/store/selectors/order.selectors';

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent {
    private order$: Observable<AppState>;
    private get paymentInfo(): PaymentInfo | undefined {
        if (this.form.invalid) return undefined;
        return new PaymentInfo({
            cardNumber: this.form.get('cardNumber')?.value,
            expirationDate: this.form.get('expDate')?.value,
            securityCode: this.form.get('code')?.value,
        });
    }

    public form = this.fb.group({
        cardNumber: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        code: ['', [Validators.required]],
    });

    constructor(public fb: UntypedFormBuilder, private router: Router, private store: Store<AppState>, private orderService: OrderService) {
        this.order$ = this.store.select(orderSelector);
    }

    public back(): void {
        this.router.navigate(['billing']);
    }

    public submit(): void {
        if (!this.paymentInfo) return;
        this.order$
            .pipe(
                mergeMap((res) => {
                    if (!res.billingInfo) {
                        throw new Error('');
                    }
                    var o = new Order({
                        billingInfo: res.billingInfo,
                        items: res.items,
                        date: res.date,
                    });
                    return this.orderService.submitOrder(o);
                })
            )
            .subscribe({
                next: () => {
                    this.store.dispatch(clearOrder());
                },
                error: (error) => {
                    // TODO: inform user
                    console.log(error);
                },
            });
    }
}
