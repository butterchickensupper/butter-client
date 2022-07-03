import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuComponent } from './menu.component';
import { MenuService } from '../services/menu/menu.service';
import { OrderService } from '../services/order/order.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [MatSnackBarModule, MatCardModule],
            providers: [
                {
                    provide: MenuService,
                    useValue: {
                        getMenu: jasmine.createSpy('getMenu').and.returnValue(of([])),
                    },
                },
                {
                    provide: OrderService,
                    useValue: {
                        addMenuOrder: jasmine.createSpy('addMenuOrder'),
                        deleteMenuItem: jasmine.createSpy('deleteMenuItem'),
                    },
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: jasmine.createSpy('navigate'),
                    },
                },
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
