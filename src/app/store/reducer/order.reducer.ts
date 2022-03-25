import { Action, createReducer, on } from '@ngrx/store';
import { Order } from 'src/app/menu/models/order';
import { addOrder } from '../action/order.actions';

export const orderFeatureKey = 'order';

export interface OrderState {
  order: Order;
}

export const initialState: OrderState = {
  order: { items: [], name: '', address: '' }
};

export const orderReducer = createReducer(
  initialState,
  on(addOrder, (state: OrderState, { order }) => ({ ...state, order: order }))
);

export function reducer(state: OrderState | undefined, action: Action): any {
  return orderReducer(state, action);
}
