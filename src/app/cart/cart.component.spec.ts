import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { MaterialModule } from '../core/material/material.module';
import { OrderService } from '../services/order/order.service';
import { CartComponent } from './cart.component';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartComponent],
            imports: [FormsModule, ReactiveFormsModule, MaterialModule, RouterTestingModule.withRoutes([])],
            providers: [
                {
                    provide: OrderService,
                    useValue: {
                        getMenuOrders: jasmine.createSpy('getMenuOrders').and.returnValue(of([])),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(CartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
