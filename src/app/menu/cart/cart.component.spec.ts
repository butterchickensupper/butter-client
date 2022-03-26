import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { CartComponent } from './cart.component';
import { selectOrder } from '../../store/selector/order.selectors';
import { MenuService } from '../menu.service';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [
        {
          provide: MenuService,
          useValue: {
            getMenu: jasmine.createSpy('getMenu'),
            submitOrder: jasmine.createSpy('submitOrder')
          }
        },
        provideMockStore({
          initialState: { order: { items: [], name: '', address: '' } },
          selectors: [{ selector: selectOrder, value: { name: 'Butter Chicken', address: '123 Main St', items: [] } }]
        })
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
