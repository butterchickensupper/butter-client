import { Component } from '@angular/core';

@Component({
    selector: 'app-checkout-complete',
    template: `
        <mat-card class="result">
            <mat-card-title> Order Recieved </mat-card-title>
            <mat-card-content>
                <mat-label>Time: </mat-label>
                <span class="text-bold">{{ date | date: 'medium' }}</span>
            </mat-card-content>
        </mat-card>
        <p class="card-spacer"></p>
    `,
    styleUrls: ['./checkout.component.scss'],
})
export class CheckoutCompleteComponent {
    public date = new Date();
    constructor() {}
    // TODO: show sent order info?
}
