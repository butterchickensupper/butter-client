import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemViewerComponent } from './menu-item-viewer.component';

describe('MenuItemViewerComponent', () => {
  let component: MenuItemViewerComponent;
  let fixture: ComponentFixture<MenuItemViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuItemViewerComponent],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
