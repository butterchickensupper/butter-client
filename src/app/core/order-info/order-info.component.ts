import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';

@Component({
    selector: 'app-order-info',
    templateUrl: './order-info.component.html',
    styleUrls: ['./order-info.component.scss'],
})
export class OrderInfoComponent implements OnInit {
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

    constructor(public fb: UntypedFormBuilder) {}

    public showDelivery() {
        this.selectedOption = 'delivery';
    }

    public showPickup() {
        this.selectedOption = 'pickup';
    }

    ngOnInit(): void {
        console.log('init');
    }
}
