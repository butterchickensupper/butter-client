import { MenuItem } from './models/menu';
import { MenuOrder } from './models/order';

export interface AppState {
  readonly orders: MenuOrder[];
  readonly items: MenuItem[];
}
