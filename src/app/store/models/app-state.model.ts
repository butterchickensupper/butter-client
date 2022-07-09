import { BillingInfo } from 'src/app/models/billing-info';
import { MenuOrder } from 'src/app/models/order';
import { OrderType } from 'src/app/models/order-type.enum';
import { PaymentInfo } from 'src/app/models/payment-info';

export interface AppState {
    id?: string;
    items: MenuOrder[];
    billingInfo?: BillingInfo;
    paymentInfo?: PaymentInfo;
    date: Date;
    total?: number;
    orderType?: OrderType;
}
