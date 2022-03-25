import { createAction, props } from '@ngrx/store';
import { Order } from 'src/app/menu/models/order';

export const orders = createAction('[Order] Orders');

export const addOrder = createAction('[Order] Add Order', (order: Order) => ({ order }));
