import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CartExpansionService {
    private step = new BehaviorSubject(0);
    public step$ = this.step.asObservable();

    public setStep(index: number) {
        this.step.next(index);
    }

    public nextStep() {
        let i = this.step.getValue();
        this.step.next(i + 1);
    }

    public prevStep() {
        let i = this.step.getValue();
        this.step.next(i - 1);
    }
}
