import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Menu, MenuItem } from 'src/app/models/menu';
import { Observable, Subscription, finalize } from 'rxjs';

import { ImageService } from 'src/app/services/image.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  public uploadProgress?: number;
  public uploadSub?: Subscription;
  public menu$: Observable<Menu | undefined>;
  public menu?: Menu;
  public fileName = '';
  public form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    available: [0, [Validators.min(1), Validators.required]],
    ingredients: [''],
    nutrition: [''],
    isActive: []
  });

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private imageService: ImageService
  ) {
    this.menu$ = this.menuService.getMenu('default');
  }

  public ngOnInit(): void {
    this.menu$.subscribe((a) => {
      this.menu = a;
    });
    this.route.params.subscribe((p) => {
      let id = p['id'];
      if (id) {
        let i = this.menu?.items.find((a) => a.id === id);
        if (i) {
          this.fileName = i.imageUrl;
          this.form.setValue({
            name: i.name,
            available: i.available,
            description: i.description ?? '',
            ingredients: i.ingredients ?? '',
            nutrition: i.nutrition ?? '',
            price: i.price,
            isActive: i.isActive ?? false
          });
        } else {
          // new entry, default to active?
        }
      }
    });
  }

  public onSave(): void {
    const menu = this.form.getRawValue() as MenuItem;
    console.log(menu);
    if (!this.menuService.updateMenuItem('default', menu)) {
      console.error('failed to update menuItem on default menu');
    }
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const upload$ = this.imageService.uploadImage(file).pipe(finalize(() => this.reset()));

      this.uploadSub = upload$.subscribe((event: any) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total));
        }
      });
    }
  }

  public cancelUpload() {
    this.uploadSub?.unsubscribe();
    this.reset();
  }

  public cancel(): void {
    // prompt if form isDirty
    this.router.navigateByUrl('edit-menu');
  }

  private reset() {
    if (this.uploadProgress) this.uploadProgress = undefined;
    if (this.uploadSub) this.uploadSub = undefined;
  }
}
