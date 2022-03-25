import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuViewerComponent } from './menu-viewer.component';

describe('MenuViewerComponent', () => {
  let component: MenuViewerComponent;
  let fixture: ComponentFixture<MenuViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuViewerComponent],
      imports: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
