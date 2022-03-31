import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MenuOrder, Order } from '../models/order';

import { Observable } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, AfterViewInit {
  private autocomplete!: google.maps.places.Autocomplete;

  @ViewChild('address')
  public address!: ElementRef<HTMLInputElement>;

  public orders$: Observable<MenuOrder[]>;
  public orders: MenuOrder[] = [];

  public form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]]
  });

  constructor(public fb: FormBuilder, private orderService: OrderService) {
    this.orders$ = this.orderService.getMenuOrders();
  }

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.address.nativeElement, {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components'],
      types: ['address']
    });
    this.autocomplete.addListener('place_changed', this.updateAddress);
  }

  ngOnInit(): void {
    this.orders$.subscribe((a) => {
      this.orders = a;
    });
  }

  public getTotal(): number | undefined {
    if (!this.orders) return undefined;
    let total = 0.0;
    this.orders.forEach((i) => {
      total += i.item.price * i.quantity;
    });
    return total;
  }

  public submitOrder(): void {
    if (!this.orders) {
      console.log('orders is null');
      return;
    }

    var o = new Order({
      name: this.form.get('name')?.value,
      address: this.form.get('address')?.value,
      items: this.orders,
      date: new Date()
    });
    this.orderService.submitOrder(o).subscribe((res) => {
      console.log(res);
    });

    // clear order from store
    console.log(o);
    this.orderService.clearMenuOrders();
  }

  public cancel(): void {
    // clear order from the store/server
  }

  public onOrder(): void {
    // submit order to the service
  }

  public onEdit(order: MenuOrder): void {
    this.orderService.addMenuOrder(order); //TODO: ensure UI updates
  }

  public onDelete(itemId: any): void {
    this.orderService.removeMenuOrder(itemId); //TODO: ensure UI updates
  }

  private updateAddress(): void {
    const place = this.autocomplete.getPlace();
    console.log(place);
    const b = place.address_components as google.maps.GeocoderAddressComponent[];
    console.log(b);
  }
}
