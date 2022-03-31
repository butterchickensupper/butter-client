import { Menu, MenuItem } from '../models/menu';
import { Observable, from, map } from 'rxjs';

import Dexie from 'dexie';
import { MenuOrder } from '../models/order';

export class AppDB extends Dexie {
  private menus!: Dexie.Table<Menu, string>;
  private cart!: Dexie.Table<MenuOrder, string>;

  constructor() {
    super('AppDB');
    const db = this;
    // Define tables and indexes
    db.version(1).stores({
      menus: '&id, imageUrl',
      cart: '&id'
    });
    // & unique index
    // ++ auto-increment unique PK
    // * multi-entry index
    // [A+B] compound index

    db.menus.mapToClass(Menu);
    db.cart.mapToClass(MenuOrder);
  }

  public resetDb(): Observable<any> {
    return from(Promise.all([db.menus.clear(), db.cart.clear()]));
  }

  public resetCart(): Observable<void> {
    return from(db.cart.clear());
  }
  public getCart(): Observable<MenuOrder[]> {
    return from(db.cart.toArray());
  }
  public updateOrder(order: MenuOrder): Observable<string> {
    return from(db.cart.put(order, order.id));
  }
  public deleteOrder(id: string): Observable<number> {
    return from(db.cart.where('id').equals(id).delete());
  }

  public getMenus(): Observable<Menu[]> {
    return from(db.menus.toArray());
  }
  public createMenu(menu: Menu): Observable<string> {
    return from(db.menus.put(menu, menu.id));
  }
  public getMenuById(id: string): Observable<Menu | undefined> {
    return from(db.menus.get(id));
  }
  public getMenuByUrl(url: string): Observable<Menu[]> {
    return from(db.menus.where('imageUrl').equals(url).toArray());
  }
  public updateMenu(menu: Menu): Observable<string> {
    return from(db.menus.put(menu, menu.id));
  }
  public deleteMenu(id: string): Observable<number> {
    return from(db.menus.where('id').equals(id).delete());
  }
  public updateMenuItem(menuId: string, menuItem: MenuItem) {
    return from(
      db.menus
        .where('id')
        .equals(menuId)
        .modify((menu) => {
          const index = menu?.items.findIndex((a) => a.id === menuItem.id);
          if (!index || index === -1) return;
          menu?.items.splice(index, 1);
          menu?.items.push(menuItem);
        })
    );
  }
  public deleteMenuItem(menuId: string, menuItemId: string): Observable<number> {
    return from(
      db.menus
        .where('id')
        .equals(menuId)
        .modify((menu) => {
          const index = menu?.items.findIndex((a) => a.id === menuItemId);
          if (!index || index === -1) return;
          menu?.items.splice(index, 1);
        })
    );
  }
}

export const db: AppDB = new AppDB();
