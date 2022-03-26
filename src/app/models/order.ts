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
}
