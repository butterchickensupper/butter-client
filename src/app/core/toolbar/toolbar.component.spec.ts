import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart/cart.service';

import { MaterialModule } from '../material/material.module';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
    let component: ToolbarComponent;
    let fixture: ComponentFixture<ToolbarComponent>;
    let totalItems$ = new BehaviorSubject(0);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ToolbarComponent],
            imports: [RouterTestingModule.withRoutes([]), MaterialModule],
            providers: [
                {
                    provide: CartService,
                    useValue: {
                        totalItems$: totalItems$.asObservable(),
                        updateTotals: jasmine.createSpy('updateTotals'),
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
