import { Action, INIT } from '@ngrx/store';
import { Order } from 'src/app/models/order';
import { AddOrder, ADD_ORDER, RemoveOrder, REMOVE_ORDER } from '../action/order.actions';

const initialState: Order = { name: '', address: '', items: [] };

export function orderReducer(state: Order = initialState, action: Action): Order {
  switch (action.type) {
    case ADD_ORDER:
      let n = (action as AddOrder).newOrder;
      if (n.address) state.address = n.address;
      if (n.name) state.name = n.name;
      if (n.items) state.items = [...state.items, ...n.items];
      return state;
    case REMOVE_ORDER:
      let i = (action as RemoveOrder).indexToRemove;
      const newState = state;
      newState.items.splice(i, 1);
      return newState;
    case INIT:
      return initialState;
    default:
      // return state
      // or for learning what happens under the hood:
      throw Error(`The action type "${action.type}" is not implemented`);
  }
}
