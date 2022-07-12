import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PaymentInfo } from 'src/app/models/payment-info';
import { CartExpansionService } from 'src/app/services/cart/cart-expansion.service';
import { CartService } from 'src/app/services/cart/cart.service';

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

    public step$;
    public stepId = 4;
    public form = this.fb.group({
        cardNumber: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        code: ['', [Validators.required]],
    });

    @Output()
    public order = new EventEmitter<PaymentInfo>();

    constructor(public fb: UntypedFormBuilder, private cartService: CartService, private cartExpansionService: CartExpansionService) {
        this.step$ = this.cartExpansionService.step$;
    }

    public opened(): void {
        this.cartExpansionService.setStep(this.stepId);
    }

    public back(): void {
        this.cartExpansionService.prevStep();
    }

    public submit(): void {
        const state = this.cartService.order;
        if (!this.paymentInfo || !state.billingInfo) return;

        this.order.emit(this.paymentInfo);
    }
}
