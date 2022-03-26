import { Menu } from './app/models/menu';
import { Order } from './app/models/order';

export interface AppState {
  readonly order: Order;
  readonly menu: Menu;
}
