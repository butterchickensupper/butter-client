import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements AfterViewInit {
  private autocomplete!: google.maps.places.Autocomplete;

  @ViewChild('address')
  public address!: ElementRef<HTMLInputElement>;

  public form = this.fb.group({
    name: ['', [Validators.required]],
    address: ['', [Validators.required]],
    phone: ['', [Validators.required]]
  });

  public get name(): string {
    return this.form.get('name')?.value;
  }

  public get addressResult(): string {
    return this.form.get('address')?.value;
  }

  constructor(public fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(this.address.nativeElement, {
      componentRestrictions: { country: ['us'] },
      fields: ['address_components'],
      types: ['address']
    });
    this.autocomplete.addListener('place_changed', this.updateAddress);
  }

  private updateAddress(): void {
    const place = this.autocomplete.getPlace();
    console.log(place);
    const b = place.address_components as google.maps.GeocoderAddressComponent[];
    console.log(b);
  }
}
