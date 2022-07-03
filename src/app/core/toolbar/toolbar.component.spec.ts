import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from 'src/app/services/order/order.service';
import { Router } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            imports: [MatCardModule, MatIconModule, MatBadgeModule],
            providers: [
                {
                    provide: Router,
                    useValue: {
                        navigate: jasmine.createSpy('navigate'),
                    },
                },
                {
                    provide: OrderService,
                    useValue: {
                        totalItems$: new BehaviorSubject(0),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ToolbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
