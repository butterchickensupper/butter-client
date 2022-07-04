import { MenuItem } from './menu';
import { User } from './user';

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
    public user!: User;
    public date: Date;
    public total?: number; // TODO: needs to be set on orderSubmit

    constructor(args: { user: User; items: MenuOrder[]; date: Date; total?: number; id?: string }) {
        this.user = args.user;
        this.items = args.items;
        this.date = args.date;
        this.total = args.total;
        this.id = args.id;
    }
}
