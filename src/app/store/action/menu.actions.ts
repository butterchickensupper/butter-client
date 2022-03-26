import { Action } from '@ngrx/store';
import { Menu } from 'src/app/models/menu';

export const ADD_MENU = 'ADD_MENU';

export class AddMenu implements Action {
  type: string = ADD_MENU;

  constructor(public newMenu: Menu) {}
}

export const REMOVE_MENU = 'REMOVE_MENU';

export class RemoveMenu implements Action {
  type: string = REMOVE_MENU;

  constructor(public indexToRemove: number) {}
}
