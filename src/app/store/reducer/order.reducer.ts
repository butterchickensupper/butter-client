import { Action, INIT } from '@ngrx/store';
import { MenuOrder } from 'src/app/models/order';
import { AddOrder, ADD_ORDER, RemoveOrder, REMOVE_ORDER } from '../action/order.actions';

const initialState: MenuOrder[] = [];

export function orderReducer(state = initialState, action: Action): MenuOrder[] {
  switch (action.type) {
    case ADD_ORDER:
      let newOrder = (action as AddOrder).newOrder;
      let x = state.findIndex((a) => a.item.id === newOrder.item.id);
      if (x === -1) return [...state, newOrder];
      let target = state[x].quantity + newOrder.quantity;
      if (state[x].item.available < target) throw new Error('not enough available');

      let newState1 = [...state];
      newState1.splice(x, 1);
      let newItem = new MenuOrder({ quantity: target, item: newOrder.item });
      return [...newState1, newItem];
    case REMOVE_ORDER:
      let i = (action as RemoveOrder).indexToRemove;
      const newState = [...state];
      newState.splice(i, 1);
      return newState;
    case INIT:
      return initialState;
    default:
      // return state
      // or for learning what happens under the hood:
      throw Error(`The action type "${action.type}" is not implemented`);
  }
}
