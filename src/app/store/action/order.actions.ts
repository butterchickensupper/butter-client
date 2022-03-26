import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/models/order';

export const loadOrder = createAction('[Order] Order');

export const addOrder = createAction('[Order] Add Order', (order: Order) => ({ order }));
