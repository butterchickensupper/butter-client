import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { SidenavComponent } from './sidenav.component';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidenavComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            events: of({})
          }
        }
      ]
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
