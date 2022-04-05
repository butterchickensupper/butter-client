import { MenuItem } from './menu';

export class MenuOrder {
  public id?: string;
  public item: MenuItem;
  public quantity: number;

  constructor(args: { quantity: number; item: MenuItem }) {
    this.quantity = args.quantity;
    this.item = args.item;
    this.id = args.item.id;
  }
}

export class Order {
  public id?: string;
  public items: MenuOrder[] = [];
  public name!: string;
  public address!: string;
  public date: Date;
  public total?: number; // TODO: needs to be set on orderSubmit

  constructor(args: { name: string; address: string; items: MenuOrder[]; date: Date; total?: number; id?: string }) {
    this.name = args.name;
    this.address = args.address;
    this.items = args.items;
    this.date = args.date;
    this.total = args.total;
    this.id = args.id;
  }
}
