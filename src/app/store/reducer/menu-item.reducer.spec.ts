import { MenuItem } from 'src/app/models/menu';
import { AddMenu, RemoveMenuItem } from '../action/menu.actions';
import { menuItemReducer } from './menu-item.reducer';

describe('MenuItemRecuder', () => {
  let initialState: MenuItem[];
  beforeEach(() => {
    initialState = [];
  });

  it('called with AddHero action should return a state with the added menu', () => {
    const addedMenu = { available: 1, description: '', imageUrl: '', name: '', price: 1.22 };
    expect(menuItemReducer(initialState, new AddMenu(addedMenu))).toEqual([addedMenu]);
  });

  // it('called with RemoveMenu action should return a state with the correct menu deleted', () => {
  //   const indexOfTheHeroToBeRemoved = 1;
  //   const expectedState = {
  //     items: [
  //       { name: '', description: '' },
  //       { name: '', description: '' }
  //     ]
  //   };

  //   expect(menuReducer(initialState, new RemoveMenu(indexOfTheHeroToBeRemoved))).toEqual(expectedState);
  // });
});
