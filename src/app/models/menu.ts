export class MenuItem {
  public available: number;
  public description: string;
  public id?: string;
  public imageUrl: string;
  public ingredients?: string;
  public isActive?: boolean;
  public name: string;
  public nutrition?: string;
  public price: number;
  public sequenceNumber?: number;
  public thumbnailUrl?: string;

  constructor(args: {
    description: string;
    imageUrl: string;
    name: string;
    price: number;
    id?: string;
    sequenceNumber?: number;
    thumbnailUrl?: string;
    available: number;
    nutrition?: string;
    ingredients?: string;
    isActive?: boolean;
  }) {
    this.description = args.description;
    this.imageUrl = args.imageUrl;
    this.name = args.name;
    this.price = args.price;
    this.sequenceNumber = args.sequenceNumber;
    this.thumbnailUrl = args.thumbnailUrl;
    this.available = args.available;
    this.nutrition = args.nutrition;
    this.ingredients = args.ingredients;
    this.id = args.id;
    this.isActive = args.isActive;
  }
}

export class Menu {
  public id: string;
  public items: MenuItem[];

  constructor(args: { id: string; items: MenuItem[] }) {
    this.items = args.items;
    this.id = args.id;
  }
}
