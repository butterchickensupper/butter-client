import { createSelector } from '@ngrx/store';

import { AppState } from '../models/app-state.model';

export const orderSelector = createSelector(
    (state: AppState) => state,
    (order) => order
);
export const idSelector = createSelector(orderSelector, (order) => order.id);
export const itemsSelector = createSelector(orderSelector, (order) => order.items);
export const billingSelector = createSelector(orderSelector, (order) => order.billingInfo);
export const paymentSelector = createSelector(orderSelector, (order) => order.paymentInfo);
export const dateSelector = createSelector(orderSelector, (order) => order.date);
export const orderTypeSelector = createSelector(orderSelector, (order) => order.orderType);
