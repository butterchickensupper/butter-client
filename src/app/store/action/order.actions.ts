import { Action } from '@ngrx/store';
import { MenuOrder } from 'src/app/models/order';

export const ADD_ORDER = 'ADD_ORDER';

export class AddOrder implements Action {
  type: string = ADD_ORDER;

  constructor(public newOrder: MenuOrder) {}
}

export const REMOVE_ORDER = 'REMOVE_ORDER';

export class RemoveOrder implements Action {
  type: string = REMOVE_ORDER;

  constructor(public indexToRemove: number) {}
}

export const CLEAR_ORDERS = 'CLEAR_ORDERS';

export class ClearOrders implements Action {
  type: string = CLEAR_ORDERS;
}
