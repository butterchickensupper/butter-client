import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-billing-info',
    templateUrl: './billing-info.component.html',
    styleUrls: ['./billing-info.component.scss'],
})
export class BillingInfoComponent implements OnInit {
    public selectedOption: string | undefined = undefined;
    public form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        address: ['', [Validators.required]],
        city: ['', [Validators.required]],
        state: ['', [Validators.required]],
        zip: ['', [Validators.required]],
    });

    public get user(): User | undefined {
        if (this.form.invalid) return undefined;
        return new User({
            firstName: this.form.get('firstName')?.value,
            lastName: this.form.get('lastName')?.value,
            address: this.form.get('address')?.value,
            city: this.form.get('city')?.value,
            state: this.form.get('state')?.value,
            zip: this.form.get('zip')?.value,
        });
    }

    constructor(public fb: UntypedFormBuilder, private router: Router) {}

    public showDelivery() {
        this.selectedOption = 'delivery';
    }

    public back(): void {
        this.selectedOption = undefined;
    }

    public next(): void {
        this.router.navigate(['order-info']);
    }

    ngOnInit(): void {
        console.log('init');
    }
}
