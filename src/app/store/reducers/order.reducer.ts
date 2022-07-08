import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user';

import * as OrderActions from '../actions/order.action';
import { State } from '../models/state.model';

export const initialState: State = {
    id: 'string',
    items: [],
    user: new User({ firstName: 'John', lastName: 'Smith', address: '123 Main', city: '', state: '', zip: '' }),
    date: new Date(),
    total: 0,
};

export const orderReducer = createReducer(
    initialState,
    on(OrderActions.addMenuOrder, (state, { menuOrder }) => ({ ...state, items: [...state.items, menuOrder] })),
    on(OrderActions.setOrder, (state, { order }) => ({
        id: order.id,
        items: order.items,
        user: order.user,
        date: order.date,
        total: order.total,
    })),
    on(OrderActions.clearOrder, (state) => initialState)
);
