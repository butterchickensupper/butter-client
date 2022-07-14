import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ProfileComponent } from './profile.component';

@Component({
    selector: 'app-login',
    template: '<p>login</p>',
})
class MockLoginComponent {}

describe('ProfileComponent', () => {
    let component: ProfileComponent;
    let fixture: ComponentFixture<ProfileComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProfileComponent, MockLoginComponent],
            imports: [MatCardModule],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ProfileComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
