import Dexie from 'dexie';
import { Menu } from '../models/menu';

export class MenuDB extends Dexie {
  public menus!: Dexie.Table<Menu, string>;

  constructor() {
    super('MenuDB');
    const db = this;
    //
    // Define tables and indexes
    //
    db.version(1).stores({
      menus: '&id, url'
    });

    // Let's physically map Menu class to Menu table.
    db.menus.mapToClass(Menu);
  }
}

export const db: MenuDB = new MenuDB();

/**MenuDB
 * Delete the entire database
 */
export function deleteMenuDatabase(): Promise<void> {
  return db.delete();
}

/**
 * Open a database
 */
export function openMenuDatabase(): Promise<Dexie> {
  return db.open();
}

/**
 * Read all contacts
 */
export function readAllMenus(): Promise<Menu[]> {
  return db.menus.toArray();
}

/**
 * Delete all contacts
 */
export function deleteAllMenus(): Promise<void> {
  return db.menus.clear();
}

/**
 * Create a contact
 *
 * Note that since the contact is guaranteed
 * to have a unique ID we are using `put`
 * to update the databse.
 */
export function createMenu(menu: Menu): Promise<string> {
  return db.menus.put(menu);
}

/**
 * Read an Menu
 */
// export function readMenuByID(id: string): Promise<Menu> {
//   return db.menus.get(id);
// }

/**
 * Read Menus by URL
 */
export function readMenusByURL(url: string): Promise<Menu[]> {
  return db.menus.where('url').equals(url).toArray();
}

/**
 * Update Menu
 */
export function updateMenu(menu: Menu): Promise<string> {
  return db.menus.put(menu);
}

/**
 * Delete Menu
 */
export function deleteMenu(id: string): Promise<number> {
  return db.menus.where('id').equals(id).delete();
}
