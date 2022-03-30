import Dexie from 'dexie';
import { Menu } from '../models/menu';

export class MenuDB extends Dexie {
  public menus!: Dexie.Table<Menu, string>;

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

  async resetDb() {
    await db.transaction('rw', 'menus', () => {
      this.menus.clear();
    });
  }
  async getAll(): Promise<Menu[]> {
    return await db.menus.toArray();
  }
  async createMenu(menu: Menu): Promise<string> {
    return await db.menus.put(menu, menu.id);
  }
  async getById(id: string): Promise<Menu | undefined> {
    return await db.menus.get(id);
  }
  async getByUrl(url: string): Promise<Menu[]> {
    return await db.menus.where('imageUrl').equals(url).toArray();
  }
  async update(menu: Menu): Promise<string> {
    return await db.menus.put(menu, menu.id);
  }
  async deleteMenu(id: string) {
    await db.menus.where('id').equals(id).delete();
  }
}

export const db: MenuDB = new MenuDB();
