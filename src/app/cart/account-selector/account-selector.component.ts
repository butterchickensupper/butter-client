import { Component } from '@angular/core';
import { CartExpansionService } from 'src/app/services/cart/cart-expansion.service';

@Component({
    selector: 'app-account-selector',
    templateUrl: './account-selector.component.html',
    styleUrls: ['./account-selector.component.scss'],
})
export class AccountSelectorComponent {
    public loggedIn = false;
    public step$;
    public stepId = 1;

    constructor(private cartExpansionService: CartExpansionService) {
        this.step$ = this.cartExpansionService.step$;
    }

    public handle(event: boolean) {
        this.loggedIn = event;
        this.next();
    }
    public next(): void {
        this.cartExpansionService.nextStep();
    }
    public opened(): void {
        this.cartExpansionService.setStep(this.stepId);
    }
    public back(): void {
        this.cartExpansionService.prevStep();
    }
}
