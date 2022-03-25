import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { selectOrder } from '../store/selector/order.selectors';
import { MenuAgent } from './menu.agent';

import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        {
          provide: MenuAgent,
          useValue: {
            getMenu: jasmine.createSpy('getMenu'),
            submitOrder: jasmine.createSpy('submitOrder')
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate')
          }
        },
        provideMockStore({
          initialState: { order: { items: [], name: '', address: '' } },
          selectors: [{ selector: selectOrder, value: { name: 'Butter Chicken', address: '123 Main St' } }]
        })
      ]
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
