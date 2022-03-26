import { Component, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Menu, MenuItem } from '../models/menu';
import { MenuState } from '../store/reducer/menu.reducer';
import { selectMenu } from '../store/selector/menu.selectors';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  private selectedItem?: MenuItem;
  public menu$: Observable<Menu>;
  public menu!: Menu;

  constructor(private router: Router, private store: Store<MenuState>) {
    this.menu$ = this.store.pipe(select(selectMenu));
  }

  ngOnInit(): void {
    this.menu$.subscribe((a) => {
      this.menu = a;
    });
  }

  public selectionChange(change: MatSelectionListChange): void {
    if (change.source._value) {
      this.selectedItem = change.source._value[0] as unknown as MenuItem;
      return;
    }
    console.warn('menuItem is missing', change.source._value);
  }

  public edit(): void {
    if (!this.selectedItem) return;
    this.router.navigateByUrl('edit-item/123'); // pass field to update
  }
}
