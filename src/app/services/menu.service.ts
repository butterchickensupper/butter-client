import { Menu, MenuItem } from '../models/menu';
import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { db } from '../db/menu.db';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  constructor(private httpClient: HttpClient) {
    db.getAll().subscribe((res) => {
      if (res.length === 0) {
        let defaultMenu = new Menu({
          id: 'default',
          items: [
            new MenuItem({
              id: '1',
              imageUrl: './assets/chicken.jpg',
              price: 13.99,
              description: 'Tandoori Chicken Butter',
              name: 'Butter Chicken',
              available: 20
            }),
            new MenuItem({
              id: '2',
              imageUrl: './assets/dal.jpg',
              price: 10.99,
              description: 'Lentil Dal Curry',
              name: 'Dal Curry',
              available: 25
            }),
            new MenuItem({ id: '3', imageUrl: './assets/naan.jpg', price: 4.99, description: 'Naan Bread', name: 'Naan', available: 25 }),
            new MenuItem({
              id: '4',
              imageUrl: './assets/tandoori.jpg',
              price: 12.99,
              description: 'Tandoori Chicken Description',
              name: 'Tandoori Chicken',
              available: 30
            }),
            new MenuItem({
              id: '5',
              imageUrl: './assets/samosa.jpg',
              price: 8.99,
              description: 'Potato and Pea Samosa',
              name: 'Veggie Samosa',
              available: 27
            })
          ]
        });
        db.createMenu(defaultMenu).subscribe();
      }
    });
  }

  public getMenus(): Observable<Menu[]> {
    return db.getAll();
  }

  public getMenu(id: string): Observable<Menu | undefined> {
    return db.getById(id);
  }

  public getMenuItem(id: string, itemId: string): Observable<MenuItem | undefined> {
    return db.getById(id).pipe(
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
    return db.update(menu);
  }

  public updateMenuItem(id: string, item: MenuItem): Observable<number> {
    return db.updateMenuItem(id, item);
  }

  public deleteMenuItem(id: string, itemId: string): Observable<number> {
    return db.deleteMenuItem(id, itemId);
  }
}
