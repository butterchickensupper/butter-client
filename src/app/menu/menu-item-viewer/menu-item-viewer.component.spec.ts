import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MenuItemViewerComponent } from './menu-item-viewer.component';

describe('MenuItemViewerComponent', () => {
    let component: MenuItemViewerComponent;
    let fixture: ComponentFixture<MenuItemViewerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [MenuItemViewerComponent],
            imports: [MatCardModule, MatFormFieldModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MenuItemViewerComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create ex', () => {
        expect(component).toBeTruthy();
        // set intut values then

        // fixture.detectChanges();
    });
});
