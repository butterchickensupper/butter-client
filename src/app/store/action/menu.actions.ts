import { Action } from '@ngrx/store';
import { MenuItem } from 'src/app/models/menu';

export const ADD_MENU = 'ADD_MENU';

export class AddMenu implements Action {
  type: string = ADD_MENU;

  constructor(public newItem: MenuItem) {}
}

export const REMOVE_MENU_ITEM = 'REMOVE_MENU_ITEM';

export class RemoveMenuItem implements Action {
  type: string = REMOVE_MENU_ITEM;

  constructor(public indexToRemove: number) {}
}
