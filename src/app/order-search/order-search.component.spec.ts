import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

import { MaterialModule } from '../core/material/material.module';
import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';
import { OrderSearchComponent } from './order-search.component';

describe('OrderSearchComponent', () => {
    let component: OrderSearchComponent;
    let fixture: ComponentFixture<OrderSearchComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [OrderSearchComponent],
            imports: [MaterialModule, ReactiveFormsModule, FormsModule, BrowserAnimationsModule],
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
