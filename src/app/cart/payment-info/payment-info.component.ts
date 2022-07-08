import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-payment-info',
    templateUrl: './payment-info.component.html',
    styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent implements OnInit {
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

    ngOnInit(): void {
        console.log('init');
    }

    public back(): void {
        this.router.navigate(['billing']);
    }
}
