export class MenuItem {
  public available: number;
  public description: string;
  public imageUrl: string;
  public ingredients?: string;
  public name: string;
  public nutrition?: string;
  public price: number;
  public sequenceNumber?: number;
  public thumbnailUrl?: string;

  constructor(args: { description: string; imageUrl: string; name: string; price: number; sequenceNumber?: number; thumbnailUrl?: string; available: number; nutrition?: string; ingredients?: string }) {
    this.description = args.description;
    this.imageUrl = args.imageUrl;
    this.name = args.name;
    this.price = args.price;
    this.sequenceNumber = args.sequenceNumber;
    this.thumbnailUrl = args.thumbnailUrl;
    this.available = args.available;
    this.nutrition = args.nutrition;
    this.ingredients = args.ingredients;
  }
}

export class Menu {
  private _items: MenuItem[];

  public get items(): MenuItem[] {
    return this._items;
  }

  constructor(args: { items: MenuItem[] }) {
    this._items = args.items;
  }
}
