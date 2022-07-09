import { createReducer, on } from '@ngrx/store';

import * as OrderActions from '../actions/order.action';
import { AppState } from '../models/app-state.model';

export const initialState: AppState = {
    items: [],
    date: new Date(),
};

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.addMenuOrder, (state, { menuOrder }) => ({ ...state, items: [...state.items, menuOrder] })),
    on(OrderActions.setOrder, (state, { order }) => ({
        id: order.id,
        items: order.items,
        billingInfo: order.billingInfo,
        date: order.date,
        total: order.total,
        orderType: order.orderType,
    })),
    on(OrderActions.clearOrder, () => initialState),
    on(OrderActions.setBillingInfo, (state, { billingInfo }) => ({ ...state, billingInfo: billingInfo })),
    on(OrderActions.setPaymentInfo, (state, { paymentInfo }) => ({ ...state, paymentInfo: paymentInfo })),
    on(OrderActions.setOrderType, (state, { orderType }) => ({ ...state, orderType: orderType }))
);
