import { Menu, MenuItem } from '../models/menu';
import { Observable, map, of } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus?: Menu[] = undefined;

  constructor(private httpClient: HttpClient) {}

  public getMenus(): Observable<Menu[]> {
    if (this.menus) return of(this.menus);
    return this.httpClient.get<Menu[]>('/assets/menu.json').pipe(
      map((m) => {
        this.menus = m;
        return m;
      })
    );
  }
  public getMenu(id: string): Observable<Menu | undefined> {
    return this.getMenus().pipe(
      map((r) => {
        const i = r.findIndex((x) => x.id === id);
        if (i === -1) return undefined;
        return r[i];
      })
    );
  }
  public getMenuItem(id: string, itemId: string): Observable<MenuItem | undefined> {
    return this.getMenu(id).pipe(
      map((r) => {
        const index = r?.items.findIndex((a) => a.id === itemId);
        if (!index || index === -1) {
          return undefined;
        }
        return r?.items[index];
      })
    );
  }
  public updateMenu(menu: Menu): Observable<string> {
    if (!this.menus) return of();
    const i = this.menus.findIndex((x) => x.id === menu.id);
    if (i !== -1) {
      this.menus.splice(i, 1);
    }
    this.menus.push(menu);
    return of('added');
  }
  public updateMenuItem(id: string, item: MenuItem): Observable<number> {
    if (!this.menus) return of();
    const i = this.menus.findIndex((x) => x.id === id);
    if (i !== -1) {
      const i2 = this.menus[i].items.findIndex((y) => y.id === item.id);
      if (i2 !== -1) {
        this.menus[i].items[i2] = item;
        return of(1);
      }
    }
    return of(0);
  }
  public deleteMenuItem(id: string, itemId: string): Observable<number> {
    if (!this.menus) return of();
    // TODO: delete all images from s3
    const i = this.menus.findIndex((x) => x.id === id);
    if (i !== -1) {
      const i2 = this.menus[i].items.findIndex((y) => y.id === itemId);
      if (i2 !== -1) {
        this.menus[i].items.splice(i2, 1);
        return of(1);
      }
    }
    return of(0);
  }
}
