import { Menu, MenuItem } from '../models/menu';
import { Observable, of, throwError } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menus: Menu[] = [];

  constructor(private httpClient: HttpClient) {
    this.menus.push(
      new Menu({
        id: 'default',
        items: [
          new MenuItem({ id: '1', imageUrl: './assets/chicken.jpg', price: 13.99, description: 'Tandoori Chicken Butter', name: 'Butter Chicken', available: 20 }),
          new MenuItem({ id: '2', imageUrl: './assets/dal.jpg', price: 10.99, description: 'Lentil Dal Curry', name: 'Dal Curry', available: 25 }),
          new MenuItem({ id: '3', imageUrl: './assets/naan.jpg', price: 4.99, description: 'Naan Bread', name: 'Naan', available: 25 })
        ]
      })
    );
  }

  public getMenus(): Observable<Menu[]> {
    return of(this.menus);
  }

  public getMenu(id: string): Observable<Menu | undefined> {
    const index = this.menus.findIndex((x) => x.id === id);
    if (index === -1) return of(undefined);
    return of(this.menus[index]);
  }

  public getMenuItem(id: string, itemId: string): Observable<MenuItem | undefined> {
    const index = this.menus.findIndex((x) => x.id === id);
    if (index === -1) return of(undefined);
    const index1 = this.menus[index].items.findIndex((y) => y.id === itemId);
    if (index1 === -1) return of(undefined);
    return of(this.menus[index].items[index1]);
  }

  public updateMenu(menu: Menu): void {
    const index = this.menus.findIndex((x) => x.id === menu.id);
    if (index === -1) this.menus.push(menu);
    this.menus[index] = menu;
  }

  public updateMenuItem(id: string, item: MenuItem): boolean {
    const index = this.menus.findIndex((x) => x.id === id);
    if (index === -1) {
      return false;
    }
    const index1 = this.menus[index].items.findIndex((y) => y.id === item.id);
    if (index1 === -1) {
      this.menus[index].items.push(item);
      return true;
    }
    this.menus[index].items[index1] = item;
    return true;
  }

  public deleteMenuItem(id: string, itemId: string): boolean {
    const menuIndex = this.menus.findIndex((x) => x.id === id);
    if (menuIndex === -1) {
      return false;
    }
    const menuItemIndex = this.menus[menuIndex].items.findIndex((y) => y.id === itemId);
    if (menuItemIndex === -1) {
      return false;
    }
    this.menus[menuIndex].items.splice(menuItemIndex, 1);
    return true;
  }
}
