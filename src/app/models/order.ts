import { BillingInfo } from './billing-info';
import { MenuItem } from './menu';
import { OrderType } from './order-type.enum';

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
    public billingInfo!: BillingInfo;
    public date: Date;
    public total?: number; // this is used for the UI

    constructor(args: { billingInfo: BillingInfo; items: MenuOrder[]; date: Date; id?: string }) {
        this.billingInfo = args.billingInfo;
        this.items = args.items;
        this.date = args.date;
        this.id = args.id;
    }
}

export interface AppState {
    id?: string;
    items: MenuOrder[];
    billingInfo?: BillingInfo;
    date?: Date;
    total?: number;
    orderType?: OrderType;
}
