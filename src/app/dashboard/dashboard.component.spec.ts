import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { of } from 'rxjs';

import { LoadingService } from '../services/loading/loading.service';
import { OrderService } from '../services/order/order.service';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
    let component: DashboardComponent;
    let fixture: ComponentFixture<DashboardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DashboardComponent],
            imports: [MatCardModule],
            providers: [
                {
                    provide: LoadingService,
                    useValue: {
                        show: jasmine.createSpy('show'),
                    },
                },
                {
                    provide: OrderService,
                    useValue: {
                        search: jasmine.createSpy('search').and.returnValue(of([])),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DashboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
