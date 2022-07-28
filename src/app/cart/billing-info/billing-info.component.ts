import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BillingInfo } from 'src/app/models/billing-info';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-billing-info',
    templateUrl: 'billing-info.component.html',
    styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent {
    public get billingInfo(): BillingInfo | undefined {
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
    public billingInfoForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        sameAsBilling: [''],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });

    @Input()
    public isDelivery = false;
    @Output()
    public back = new EventEmitter();
    @Output()
    public next = new EventEmitter();

    constructor(private formBuilder: UntypedFormBuilder, private cartService: CartService) {}

    public goNext(): void {
        if (!this.billingInfo) return;

        if (this.isDelivery) this.cartService.setDeliveryInfo(this.billingInfo);
        else this.cartService.setBillingInfo(this.billingInfo);
        this.next.emit();
    }

    public goBack(): void {
        this.back.emit();
    }

    public reset(): void {
        this.billingInfoForm.reset({ firstName: '', lastName: '', address: '', city: '', state: '', zip: '' });
    }
}
