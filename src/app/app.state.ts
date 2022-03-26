import { Menu } from './models/menu';
import { Order } from './models/order';

export interface AppState {
  readonly order: Order;
  readonly menu: Menu;
}
