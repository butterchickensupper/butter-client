import { Component, EventEmitter, Output } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { PaymentInfo } from 'src/app/models/payment-info';

@Component({
    selector: 'app-payment-info',
    templateUrl: 'payment-info.component.html',
    styleUrls: ['./payment-info.component.scss'],
})
export class PaymentInfoComponent {
    public get paymentInfo(): PaymentInfo | undefined {
        if (this.payInfoForm.invalid) return undefined;
        return new PaymentInfo({
            cardNumber: this.payInfoForm.get('cardNumber')?.value,
            expirationDate: this.payInfoForm.get('expDate')?.value,
            securityCode: this.payInfoForm.get('code')?.value,
        });
    }

    public payInfoForm = this.formBuilder.group({
        cardNumber: ['', [Validators.required]],
        expDate: ['', [Validators.required]],
        code: ['', [Validators.required]],
    });

    @Output()
    public back = new EventEmitter();
    @Output()
    public next = new EventEmitter();

    constructor(private formBuilder: UntypedFormBuilder) {}

    public goNext(): void {
        this.back.emit();
    }

    public goBack(): void {
        this.next.emit();
    }
}
