import { BreakpointObserver } from '@angular/cdk/layout';
import { CdkStep } from '@angular/cdk/stepper';
import { Component, ViewChild } from '@angular/core';
import { MatStep, MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DialogService } from 'src/app/core/dialog/dialog.service';
import { Order } from 'src/app/models/order';
import { OrderType } from 'src/app/models/order-type.enum';
import { CartService } from 'src/app/services/cart/cart.service';
import { LoadingService } from 'src/app/services/loading/loading.service';
import { OrderService } from 'src/app/services/order/order.service';

import { BillingInfoComponent } from '../billing-info/billing-info.component';
import { PaymentInfoComponent } from '../payment-info/payment-info.component';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
    @ViewChild('stepper')
    private matStepper?: MatStepper;
    @ViewChild('payInfoStep')
    private payInfoStep?: MatStep;

    @ViewChild('billing')
    private billingInfoComponent!: BillingInfoComponent;
    @ViewChild('payment')
    private paymentInfoComponent!: PaymentInfoComponent;

    private deliveryInfoComponent?: BillingInfoComponent;
    @ViewChild('delivery', { static: false })
    public set content(deliveryInfo: BillingInfoComponent) {
        if (deliveryInfo) {
            this.deliveryInfoComponent = deliveryInfo;
        }
    }

    public stepperOrientation: Observable<StepperOrientation>;
    public orderType?: OrderType;

    constructor(
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
        this.next();
    }

    public next(): void {
        if (this.matStepper) {
            if (this.matStepper.selected) {
                this.completeStep(this.matStepper.selected);
            }

            this.matStepper.next();
        }
    }

    public back(): void {
        if (this.matStepper) this.matStepper.previous();
    }

    public completeOrder(): void {
        if (!this.paymentInfoComponent?.paymentInfo) return;
        this.completeStep(this.payInfoStep);
        this.submit().subscribe({
            next: () => {
                this.cartService.clear();
                this.loadingService.hide();
                this.router.navigate(['status']);
            },
            error: (error) => {
                this.loadingService.hide();
                console.log(error);
                this.dialogService.showErrorDialog(error);
            },
        });
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
        this.deliveryInfoComponent?.reset();
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
        this.next();
    }

    public resetOrderType(): void {
        this.orderType = undefined;
    }

    private set(type: OrderType): void {
        this.cartService.setOrderType(type);
        this.orderType = type;
    }

    public submit(): Observable<Order> {
        if (!this.billingInfoComponent?.billingInfo) {
            throw new Error('billing information is missing');
        }
        if (!this.paymentInfoComponent?.paymentInfo) {
            throw new Error('payment information is missing');
        }
        if (this.orderType === OrderType.Delivery && !this.deliveryInfoComponent?.billingInfo) {
            throw new Error('delivery information is missing');
        }

        this.loadingService.show();
        var o = new Order({
            billingInfo: this.billingInfoComponent.billingInfo,
            items: this.cartService.order.items,
            deliveryInfo: this.orderType === OrderType.Delivery ? this.deliveryInfoComponent?.billingInfo : undefined,
        });
        return this.orderService.submitOrder(o);
    }

    private completeStep(step?: CdkStep): void {
        if (step) {
            step.completed = true;
            step.editable = false;
        }
    }
}
