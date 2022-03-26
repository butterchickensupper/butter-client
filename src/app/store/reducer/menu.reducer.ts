import { Action, createReducer, on } from '@ngrx/store';
import { Menu } from 'src/app/models/menu';
import { addMenu } from '../action/menu.actions';

export const menuFeatureKey = 'menu';

export interface MenuState {
  menu: Menu;
}

export const initialState: MenuState = {
  menu: new Menu({ items: [] })
};

export const customerReducer = createReducer(
  initialState,
  on(addMenu, (state: MenuState, { menu }) => ({ ...state, menu: menu }))
);

export function reducer(menu: MenuState | undefined, action: Action): any {
  return customerReducer(menu, action);
}
