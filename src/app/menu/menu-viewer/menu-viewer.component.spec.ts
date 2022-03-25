import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { MenuViewerComponent } from './menu-viewer.component';

describe('MenuViewerComponent', () => {
  let component: MenuViewerComponent;
  let fixture: ComponentFixture<MenuViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuViewerComponent],
      imports: [MatInputModule, MatFormFieldModule, MatCheckboxModule]
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
