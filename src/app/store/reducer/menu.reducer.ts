import { Action, INIT } from '@ngrx/store';
import { Menu } from 'src/app/models/menu';
import { AddMenu, ADD_MENU, REMOVE_MENU } from '../action/menu.actions';

const initialState: Menu = { items: [] };

export function menuReducer(state: Menu = initialState, action: Action): Menu {
  switch (action.type) {
    case ADD_MENU:
      return (action as AddMenu).newMenu;
    case REMOVE_MENU:
      return initialState; // reset
    case INIT:
      return initialState;
    default:
      // return state
      // or for learning what happens under the hood:
      throw Error(`The action type "${action.type}" is not implemented`);
  }
}
