import { createAction, props } from '@ngrx/store';
import { BillingInfo } from 'src/app/models/billing-info';
import { MenuOrder } from 'src/app/models/order';
import { OrderType } from 'src/app/models/order-type.enum';
import { PaymentInfo } from 'src/app/models/payment-info';

import { AppState } from '../models/app-state.model';

export const addMenuOrder = createAction('[ORDER] Add MenuOrder', props<{ menuOrder: MenuOrder }>());
export const setOrder = createAction('[ORDER] Set Order', props<{ order: AppState }>());
export const clearOrder = createAction('[ORDER] Clear Order');
export const setBillingInfo = createAction('[ORDER] Set BillingInfo', props<{ billingInfo: BillingInfo }>());
export const setPaymentInfo = createAction('[ORDER] Set PaymentInfo', props<{ paymentInfo: PaymentInfo }>());
export const setOrderType = createAction('[ORDER] Set OrderType', props<{ orderType: OrderType }>());
