import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTypeComponent } from './order-type.component';

describe('OrderTypeComponent', () => {
  let component: OrderTypeComponent;
  let fixture: ComponentFixture<OrderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
