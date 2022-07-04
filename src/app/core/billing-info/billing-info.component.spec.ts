import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../material/material.module';
import { BillingInfoComponent } from './billing-info.component';

describe('BillingInfoComponent', () => {
    let component: BillingInfoComponent;
    let fixture: ComponentFixture<BillingInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [BillingInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(BillingInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
