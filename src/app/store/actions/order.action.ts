import { createAction, props } from '@ngrx/store';
import { MenuOrder } from 'src/app/models/order';

import { State } from '../models/state.model';

export const addMenuOrder = createAction('[ORDER] Add MenuOrder', props<{ menuOrder: MenuOrder }>());
export const setOrder = createAction('[ORDER] Set Order', props<{ order: State }>());
export const clearOrder = createAction('[ORDER] Clear Order');
