import { Action, INIT } from '@ngrx/store';
import { MenuItem } from 'src/app/models/menu';
import { AddMenu, ADD_MENU, RemoveMenuItem, REMOVE_MENU_ITEM } from '../action/menu.actions';

const initialState: MenuItem[] = [];

export function menuItemReducer(state: MenuItem[] = initialState, action: Action): MenuItem[] {
  console.log(action);
  switch (action.type) {
    case ADD_MENU:
      let n = (action as AddMenu).newItem;
      return [...state, n];
    case REMOVE_MENU_ITEM:
      let i = (action as RemoveMenuItem).indexToRemove;
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
