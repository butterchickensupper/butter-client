import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrder from '../reducer/order.reducer';

export const selectOrderState = createFeatureSelector<fromOrder.OrderState>(fromOrder.orderFeatureKey);

export const selectOrder = createSelector(selectOrderState, (order: fromOrder.OrderState) => order.order);
