import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, Subscription, finalize } from 'rxjs';

import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/menu/menu.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {
  uploadProgress?: number;
  uploadSub?: Subscription;
  public menu$: Observable<Menu>;
  public menu!: Menu;
  public fileName = '';
  public form = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: ['', [Validators.required]],
    available: [0, [Validators.min(1), Validators.required]],
    ingredients: [''],
    nutrition: ['']
  });

  constructor(public fb: FormBuilder, private http: HttpClient, private router: Router, private route: ActivatedRoute, private menuService: MenuService) {
    this.menu$ = this.menuService.getMenu();
  }

  ngOnInit(): void {
    this.menu$.subscribe((a) => {
      this.menu = a;
    });
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      let id = params['id'];
      if (id) {
        //let i = this.menu.items.find((a) => a.id === id);
        //TODO: load menu item into ui
      }
    });
  }

  public onSave(): void {
    // update store
    console.log(this.form.value);
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append('thumbnail', file);

      const upload$ = this.http
        .post('/api/thumbnail-upload', formData, {
          reportProgress: true,
          observe: 'events'
        })
        .pipe(finalize(() => this.reset()));

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
    // clear out ngrx store
    this.router.navigateByUrl('edit-menu');
  }

  private reset() {
    if (this.uploadProgress) this.uploadProgress = undefined;
    if (this.uploadSub) this.uploadSub = undefined;
  }
}
