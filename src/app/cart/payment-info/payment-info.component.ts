import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Order } from 'src/app/models/order';
import { PaymentInfo } from 'src/app/models/payment-info';
import { CartService } from 'src/app/services/cart/cart.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent {
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

    constructor(public fb: UntypedFormBuilder, private orderService: OrderService, private cartService: CartService) {}

    public back(): void {
        //this.router.navigate(['billing']);
    }

    public submit(): void {
        const state = this.cartService.order;
        if (!this.paymentInfo || !state.billingInfo) return;

        var o = new Order({
            billingInfo: state.billingInfo,
            items: state.items,
        });
        this.orderService.submitOrder(o).subscribe({
            next: () => {
                this.cartService.clear();
            },
            error: (error) => {
                // TODO: inform user
                console.log(error);
            },
        });
    }
}
