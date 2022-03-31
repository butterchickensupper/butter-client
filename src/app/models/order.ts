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
  public total?: number; // TODO: needs to be set on orderSubmit

  constructor(args: { name: string; address: string; items: MenuOrder[]; date: Date; total?: number }) {
    this.name = args.name;
    this.address = args.address;
    this.items = args.items;
    this.date = args.date;
    this.total = args.total;
  }
}
