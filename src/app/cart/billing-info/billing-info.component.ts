import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { BillingInfo } from 'src/app/models/billing-info';
import { CartExpansionService } from 'src/app/services/cart/cart-expansion.service';
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
    public step$;
    public stepId = 3;

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

    constructor(public fb: UntypedFormBuilder, private cartService: CartService, private cartExpansionService: CartExpansionService) {
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
        this.step$ = this.cartExpansionService.step$;
    }

    public opened() {
        this.cartExpansionService.setStep(this.stepId);
    }

    public back() {
        this.cartExpansionService.prevStep();
    }

    public payment(): void {
        if (!this.billingInfo) return;
        this.cartService.setBillingInfo(this.billingInfo);
        this.cartExpansionService.nextStep();
    }
}
