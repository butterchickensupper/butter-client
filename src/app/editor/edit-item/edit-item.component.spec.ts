import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditItemComponent } from './edit-item.component';
import { ImageService } from 'src/app/services/image.service';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MenuService } from 'src/app/services/menu.service';
import { of } from 'rxjs';

describe('EditItemComponent', () => {
  let component: EditItemComponent;
  let fixture: ComponentFixture<EditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditItemComponent],
      imports: [BrowserAnimationsModule, FormsModule, ReactiveFormsModule, MatInputModule, MatCardModule, MatCheckboxModule],
      providers: [
        {
          provide: Router,
          useValue: {}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({})
          }
        },
        {
          provide: MenuService,
          useValue: {
            getMenu: jasmine.createSpy('getMenu').and.returnValue(of([]))
          }
        },
        {
          provide: ImageService,
          useValue: jasmine.createSpyObj('ImageService', ['uploadImage'])
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
