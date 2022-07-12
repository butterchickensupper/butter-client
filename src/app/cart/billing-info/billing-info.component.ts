import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BillingInfo } from 'src/app/models/billing-info';
import { CartService } from 'src/app/services/cart/cart.service';

@Component({
    selector: 'app-billing-info',
    templateUrl: './billing-info.component.html',
    styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent {
    public existing: BillingInfo | undefined;
    public form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });

    private get billingInfo(): BillingInfo | undefined {
        if (this.form.invalid) return undefined;
        return new BillingInfo({
            firstName: this.form.get('firstName')?.value,
            lastName: this.form.get('lastName')?.value,
            address: this.form.get('address')?.value,
            city: this.form.get('city')?.value,
            state: this.form.get('state')?.value,
            zip: this.form.get('zip')?.value,
        });
    }

    constructor(public fb: UntypedFormBuilder, private cartService: CartService) {
        this.existing = this.cartService.billingInfo;
        this.existing = new BillingInfo({
            firstName: 'John',
            lastName: 'Smith',
            address: '123 Main',
            city: 'Livonia',
            state: 'MI',
            zip: '48154',
        });
        this.form.setValue(this.existing);
    }

    public back(): void {
        //this.router.navigate(['account']);
    }

    public payment(): void {
        if (!this.billingInfo) return;
        this.cartService.setBillingInfo(this.billingInfo);
        //this.router.navigate(['payment']);
    }
}
