import { Action, INIT } from '@ngrx/store';
import { MenuOrder } from 'src/app/models/order';
import { AddOrder, ADD_ORDER, RemoveOrder, REMOVE_ORDER } from '../action/order.actions';

const initialState: MenuOrder[] = [];

export function orderReducer(state = initialState, action: Action): MenuOrder[] {
  console.log(action);
  switch (action.type) {
    case ADD_ORDER:
      let n = (action as AddOrder).newOrder;
      return [...state, n];
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
