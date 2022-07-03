import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './cart.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderService } from '../services/order/order.service';
import { of } from 'rxjs';

describe('CartComponent', () => {
    let component: CartComponent;
    let fixture: ComponentFixture<CartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CartComponent],
            imports: [FormsModule, ReactiveFormsModule, MatCardModule, MatFormFieldModule],
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
