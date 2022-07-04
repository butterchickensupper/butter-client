import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneAccountComponent } from './phone-account.component';

describe('PhoneAccountComponent', () => {
  let component: PhoneAccountComponent;
  let fixture: ComponentFixture<PhoneAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhoneAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
