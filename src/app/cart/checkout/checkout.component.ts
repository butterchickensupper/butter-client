import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { MatStep, MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { BillingInfo } from 'src/app/models/billing-info';
import { DeliveryInfo } from 'src/app/models/delivery-info';
import { Order } from 'src/app/models/order';
import { OrderType } from 'src/app/models/order-type.enum';
import { PaymentInfo } from 'src/app/models/payment-info';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
    @ViewChild('stepper')
    private matStepper?: MatStepper;
    @ViewChild('loginStep')
    private loginStep?: MatStep;
    @ViewChild('orderTypeStep')
    private orderTypeStep?: MatStep;
    @ViewChild('billInfoStep')
    private billInfoStep?: MatStep;
    @ViewChild('payInfoStep')
    private payInfoStep?: MatStep;

    private get billingInfo(): BillingInfo | undefined {
        if (this.billingInfoForm.invalid) return undefined;
        return new BillingInfo({
            firstName: this.billingInfoForm.get('firstName')?.value,
            lastName: this.billingInfoForm.get('lastName')?.value,
            address: this.billingInfoForm.get('address')?.value,
            city: this.billingInfoForm.get('city')?.value,
            state: this.billingInfoForm.get('state')?.value,
            zip: this.billingInfoForm.get('zip')?.value,
        });
    }

    private get deliveryInfo(): DeliveryInfo | undefined {
        if (this.deliveryInfoForm.invalid) return undefined;
        return new DeliveryInfo({
            sameAsBilling: this.deliveryInfoForm.get('sameAsBilling')?.value,
            address: this.deliveryInfoForm.get('address')?.value,
            city: this.deliveryInfoForm.get('city')?.value,
            state: this.deliveryInfoForm.get('state')?.value,
            zip: this.deliveryInfoForm.get('zip')?.value,
        });
    }

    private get paymentInfo(): PaymentInfo | undefined {
        if (this.payInfoForm.invalid) return undefined;
        return new PaymentInfo({
            cardNumber: this.payInfoForm.get('cardNumber')?.value,
            expirationDate: this.payInfoForm.get('expDate')?.value,
            securityCode: this.payInfoForm.get('code')?.value,
        });
    }

    public billingInfoForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });
    public deliveryInfoForm = this.formBuilder.group({
        sameAsBilling: [false, [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });
    public payInfoForm = this.formBuilder.group({
        cardNumber: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        code: ['', [Validators.required]],
    });
    public stepperOrientation: Observable<StepperOrientation>;
    public orderType?: OrderType;

    constructor(
        private formBuilder: UntypedFormBuilder,
        public breakpointObserver: BreakpointObserver,
        private router: Router,
        private cartService: CartService,
        private orderService: OrderService,
        private loadingService: LoadingService,
        private dialogService: DialogService
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    public goToCart(): void {
        this.router.navigate(['cart']);
    }

    public completeLogin(): void {
        this.completeStep(this.loginStep);
        this.next();
    }

    public next(): void {
        if (this.matStepper) this.matStepper.next();
    }

    public completeBilling(): void {
        if (!this.billingInfo) return;
        this.completeStep(this.billInfoStep);
        this.cartService.setBillingInfo(this.billingInfo);
        this.next();
    }

    public completeOrder(): void {
        if (!this.paymentInfo) return;
        this.completeStep(this.payInfoStep);
        this.submit().subscribe({
            next: () => {
                this.cartService.clear();
                setTimeout(() => this.loadingService.hide(), 0);
                this.router.navigate(['status']);
            },
            error: (error) => {
                setTimeout(() => this.loadingService.hide(), 0);
                console.log(error);
                this.dialogService.showErrorDialog(error);
            },
        });
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
        this.completeStep(this.orderTypeStep);
        this.next();
    }

    private set(type: OrderType): void {
        this.cartService.setOrderType(type);
        this.orderType = type;
    }

    public submit(): Observable<Order> {
        if (!this.billingInfo) {
            throw new Error('billing information is missing');
        }
        if (!this.paymentInfo) {
            throw new Error('payment information is missing');
        }
        if (this.orderType === OrderType.Delivery && !this.deliveryInfo) {
            throw new Error('delivery information is missing');
        }

        setTimeout(() => this.loadingService.show(), 0);
        var o = new Order({
            billingInfo: this.billingInfo,
            items: this.cartService.order.items,
            deliveryInfo: this.orderType === OrderType.Delivery ? this.deliveryInfo : undefined,
        });
        return this.orderService.submitOrder(o);
    }

    private completeStep(step?: MatStep): void {
        if (step) {
            step.completed = true;
            step.editable = false;
        }
    }
}
