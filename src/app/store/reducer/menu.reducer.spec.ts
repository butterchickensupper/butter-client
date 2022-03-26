import { Menu } from 'src/app/models/menu';
import { AddMenu, RemoveMenu } from '../action/menu.actions';
import { menuReducer } from './menu.reducer';

describe('MenuRecuder', () => {
  let initialState: Menu;
  beforeEach(() => {
    initialState = { items: [] };
  });

  it('called with AddHero action should return a state with the added menu', () => {
    const addedMenu = { items: [] };
    expect(menuReducer(initialState, new AddMenu(addedMenu))).toEqual(addedMenu);
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
