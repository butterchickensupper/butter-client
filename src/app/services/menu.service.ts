import { Menu, MenuItem } from '../models/menu';
import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { db } from '../db/app.db';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient) {}

  public getMenus() {
    return db.getMenus();
  }

  public getMenu(id: string): Observable<Menu | undefined> {
    return db.getMenuById(id);
  }

  public getMenuItem(id: string, itemId: string): Observable<MenuItem | undefined> {
    return db.getMenuById(id).pipe(
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
    return db.updateMenu(menu);
  }

  public updateMenuItem(id: string, item: MenuItem): Observable<number> {
    return db.updateMenuItem(id, item);
  }

  public deleteMenuItem(id: string, itemId: string): Observable<number> {
    return db.deleteMenuItem(id, itemId);
  }
}
