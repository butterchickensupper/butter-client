import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromMenu from '../reducer/menu.reducer';

export const selectMenuState = createFeatureSelector<fromMenu.MenuState>(fromMenu.menuFeatureKey);
export const selectMenu = createSelector(selectMenuState, (state: fromMenu.MenuState) => state.menu);
