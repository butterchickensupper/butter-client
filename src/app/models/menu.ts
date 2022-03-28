export class MenuItem {
  public id?: string;
  public available: number;
  public description: string;
  public imageUrl: string;
  public ingredients?: string;
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
  }
}

export class Menu {
  public items: MenuItem[];

  constructor(args: { items: MenuItem[] }) {
    this.items = args.items;
  }
}
