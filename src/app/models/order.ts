import { BillingInfo } from './billing-info';
import { DeliveryInfo } from './delivery-info';
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
    public deliveryInfo?: DeliveryInfo;
    public createdAt?: Date;
    public updatedAt?: Date;
    public total?: number;

    constructor(args: { billingInfo: BillingInfo; items: MenuOrder[]; deliveryInfo?: DeliveryInfo }) {
        this.billingInfo = args.billingInfo;
        this.items = args.items;
        this.deliveryInfo = args.deliveryInfo;
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
