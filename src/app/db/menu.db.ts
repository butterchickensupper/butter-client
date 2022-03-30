import { Menu, MenuItem } from '../models/menu';
import { Observable, from } from 'rxjs';

import Dexie from 'dexie';

export class MenuDB extends Dexie {
  private menus!: Dexie.Table<Menu, string>;

  constructor() {
    super('MenuDB');
    const db = this;
    // Define tables and indexes
    db.version(1).stores({
      menus: '&id, imageUrl'
    });
    // & unique index
    // ++ auto-increment unique PK
    // * multi-entry index
    // [A+B] compound index

    db.menus.mapToClass(Menu);
  }

  public resetDb(): Observable<void> {
    return from(
      db.transaction('rw', 'menus', () => {
        this.menus.clear();
      })
    );
  }
  public getAll(): Observable<Menu[]> {
    return from(db.menus.toArray());
  }
  public createMenu(menu: Menu): Observable<string> {
    return from(db.menus.put(menu, menu.id));
  }
  public getById(id: string): Observable<Menu | undefined> {
    return from(db.menus.get(id));
  }
  public getByUrl(url: string): Observable<Menu[]> {
    return from(db.menus.where('imageUrl').equals(url).toArray());
  }
  public update(menu: Menu): Observable<string> {
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

export const db: MenuDB = new MenuDB();
