import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatStep, MatStepper, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderType } from 'src/app/models/order-type.enum';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-checkout',
    templateUrl: 'checkout.component.html',
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent {
    public existing: OrderType | undefined;

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
    @ViewChild('completeStep')
    private completeStep?: MatStep;

    public billingInfoForm = this._formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });
    public payInfoForm = this._formBuilder.group({
        cardNumber: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        code: ['', [Validators.required]],
    });
    public stepperOrientation: Observable<StepperOrientation>;
    public checkoutStatus = 'Order...';

    constructor(
        private _formBuilder: FormBuilder,
        breakpointObserver: BreakpointObserver,
        private router: Router,
        private cartService: CartService
    ) {
        this.stepperOrientation = breakpointObserver
            .observe('(min-width: 800px)')
            .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
    }

    public goToCart(): void {
        this.router.navigate(['cart']);
    }

    public loggedIn(): void {
        if (this.loginStep) {
            this.loginStep.completed = true;
            this.loginStep.editable = false;
        }
        this.next();
    }

    public next(): void {
        if (this.matStepper) this.matStepper.next();
    }

    public payment(): void {
        if (this.billInfoStep) {
            this.billInfoStep.completed = true;
            this.billInfoStep.editable = false;
        }
        this.next();
    }

    public order(): void {
        // TODO: submit order
        if (this.payInfoStep) {
            this.payInfoStep.completed = true;
            this.payInfoStep.editable = false;
        }
        this.checkoutStatus = 'Order Complete';
        this.next();
    }

    public selectDelivery() {
        this.set(OrderType.Delivery);
    }

    public selectPickup() {
        this.set(OrderType.Pickup);
    }

    private set(type: OrderType): void {
        this.existing = type;
        this.cartService.setOrderType(type);
        if (this.orderTypeStep) {
            this.orderTypeStep.completed = true;
            this.orderTypeStep.editable = false;
        }
        this.next();
    }
}
