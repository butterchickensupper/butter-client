import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { MaterialModule } from './core/material/material.module';
import { LoadingService } from './services/loading/loading.service';

@Component({
    selector: 'app-toolbar',
    template: '<p>toolbar</p>',
})
class MockToolbarComponent {}
@Component({
    selector: 'app-sidenav',
    template: '<p>toolbar</p>',
})
class MockSidenavComponent {}

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule.withRoutes([]), MaterialModule],
            declarations: [AppComponent, MockSidenavComponent, MockToolbarComponent],
            providers: [
                {
                    provide: LoadingService,
                    useValue: {},
                },
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
