import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuAgent } from '../menu/menu.agent';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {
          provider: MenuAgent,
          useValue: {
            getMenu: jasmine.createSpy('getMenu'),
            submitOrder: jasmine.createSpy('submitOrder')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
