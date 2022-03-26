import { Action, INIT } from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { AddOrder, ADD_ORDER, REMOVE_ORDER } from '../action/order.actions';

const initialState: Order = { name: '', address: '', items: [] };

export function orderReducer(state: Order = { items: [], name: '', address: '' }, action: Action): Order {
  switch (action.type) {
    case ADD_ORDER:
      return (action as AddOrder).newOrder;
    case REMOVE_ORDER:
      return initialState; // reset
    case INIT:
      return initialState;
    default:
      // return state
      // or for learning what happens under the hood:
      throw Error(`The action type "${action.type}" is not implemented`);
  }
}
