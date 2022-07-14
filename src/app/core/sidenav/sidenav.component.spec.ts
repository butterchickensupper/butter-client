import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { SidenavComponent } from './sidenav.component';

describe('SidenavComponent', () => {
    let component: SidenavComponent;
    let fixture: ComponentFixture<SidenavComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatSidenavModule, BrowserAnimationsModule, MatListModule, RouterTestingModule.withRoutes([])],
            declarations: [SidenavComponent],
            providers: [],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidenavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
