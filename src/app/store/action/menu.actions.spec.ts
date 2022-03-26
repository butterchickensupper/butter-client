import * as fromMenu from './menu.actions';

describe('loadMenus', () => {
  it('should return an action', () => {
    expect(fromMenu.loadMenus().type).toBe('[Menu] Load Menus');
  });
});
