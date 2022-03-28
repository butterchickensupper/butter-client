import { MenuItem } from '../models/menu';
import { MenuOrder } from '../models/order';

export interface IAppState {
  readonly order: MenuOrder[];
}

export interface IConfig {
  orders: MenuOrder[];
  items: MenuItem[];
}
