import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { BillingInfo } from 'src/app/models/billing-info';
import { setBillingInfo } from 'src/app/store/actions/order.action';
import { AppState } from 'src/app/store/models/app-state.model';
import { billingSelector } from 'src/app/store/selectors/order.selectors';

@Component({
    selector: 'app-billing-info',
    templateUrl: './billing-info.component.html',
    styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent {
    public existing$: Observable<BillingInfo | undefined>;
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

    constructor(public fb: UntypedFormBuilder, private router: Router, private store: Store<AppState>) {
        this.existing$ = this.store.select(billingSelector);
    }

    public back(): void {
        this.router.navigate(['account']);
    }

    public payment(): void {
        if (!this.billingInfo) return;
        this.store.dispatch(setBillingInfo({ billingInfo: this.billingInfo }));
        this.router.navigate(['payment']);
    }
}
