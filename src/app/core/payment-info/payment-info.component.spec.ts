import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../material/material.module';
import { PaymentInfoComponent } from './payment-info.component';

describe('PaymentInfoComponent', () => {
    let component: PaymentInfoComponent;
    let fixture: ComponentFixture<PaymentInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [PaymentInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(PaymentInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});