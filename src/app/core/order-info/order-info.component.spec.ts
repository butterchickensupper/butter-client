import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialModule } from '../material/material.module';
import { OrderInfoComponent } from './order-info.component';

describe('OrderInfoComponent', () => {
    let component: OrderInfoComponent;
    let fixture: ComponentFixture<OrderInfoComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MaterialModule],
            declarations: [OrderInfoComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(OrderInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
