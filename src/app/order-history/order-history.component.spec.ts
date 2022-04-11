import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { OrderHistoryComponent } from './order-history.component';
import { OrderService } from '../services/order.service';

describe('OrderHistoryComponent', () => {
  let component: OrderHistoryComponent;
  let fixture: ComponentFixture<OrderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderHistoryComponent],
      imports: [MatCardModule, MatListModule],
      providers: [
        {
          provide: OrderService,
          useValue: {
            getOrders: jasmine.createSpy('getOrders')
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
