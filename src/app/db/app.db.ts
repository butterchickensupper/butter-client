import Dexie, { liveQuery } from 'dexie';
import { Menu, MenuItem } from '../models/menu';
import { Observable, from } from 'rxjs';

import { MenuOrder } from '../models/order';
import { dexieToRx } from './db-utility';

export class AppDB extends Dexie {
  private menus!: Dexie.Table<Menu, string>;
  private cart!: Dexie.Table<MenuOrder, string>;

  constructor() {
    super('AppDB');
    const db = this;
    // Define tables and indexes
    // & unique index
    // ++ auto-increment unique PK
    // * multi-entry index
    // [A+B] compound index
    db.version(1).stores({
      menus: '&id, imageUrl',
      cart: '&id'
    });
    db.on('populate', () => {
      db.menus.add(
        new Menu({
          id: 'default',
          address: '123 Main St, Livonia, MI 48154',
          open: new Date(2000, 1, 1, 11, 0, 0),
          close: new Date(2000, 1, 1, 14, 0, 0),
          radius: 15,
          isActive: false,
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
        })
      );
    });
    db.open();

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
    return dexieToRx(liveQuery(() => db.cart.toArray()));
  }
  public updateOrder(order: MenuOrder): Observable<string> {
    return from(db.cart.put(order, order.id));
  }
  public deleteOrder(id: string): Observable<number> {
    return from(db.cart.where('id').equals(id).delete());
  }

  public getMenus(): Observable<Menu[]> {
    return dexieToRx(liveQuery(() => db.menus.toArray()));
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
