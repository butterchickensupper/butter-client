import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { MaterialModule } from '../core/material/material.module';
import { AuthService } from '../services/auth/auth.service';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';
import { OrderSearchComponent } from './order-search.component';

describe('OrderSearchComponent', () => {
    let component: OrderSearchComponent;
    let fixture: ComponentFixture<OrderSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderSearchComponent],
            imports: [MaterialModule],
            providers: [
                {
                    provide: OrderService,
                    useValue: {
                        getHistory: jasmine.createSpy('getHistory').and.returnValue(of()),
                    },
                },
                {
                    provide: LoadingService,
                    useValue: {
                        show: jasmine.createSpy('show'),
                        hide: jasmine.createSpy('hide'),
                    },
                },
                {
                    provide: AuthService,
                    useValue: {},
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(OrderSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
