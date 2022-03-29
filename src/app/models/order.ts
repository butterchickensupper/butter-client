import { MenuItem } from './menu';

export class MenuOrder {
  public item: MenuItem;
  public quantity: number;

  constructor(args: { quantity: number; item: MenuItem }) {
    this.quantity = args.quantity;
    this.item = args.item;
  }
}

export class Order {
  public items: MenuOrder[] = [];
  public name!: string;
  public address!: string;
  public date: Date;

  constructor(args: { name: string; address: string; items: MenuOrder[]; date: Date }) {
    this.name = args.name;
    this.address = args.address;
    this.items = args.items;
    this.date = args.date;
  }
}
