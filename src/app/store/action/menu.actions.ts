import { createAction, props } from '@ngrx/store';
import { Menu } from 'src/app/models/menu';

export const loadMenu = createAction('[Menu] Load Menu');

export const addMenu = createAction('[Customer] Add Menu', (menu: Menu) => ({ menu }));
