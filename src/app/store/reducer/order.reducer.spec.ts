import { Order } from 'src/app/models/order';
import { AddOrder, RemoveOrder } from '../action/order.actions';
import { orderReducer } from './order.reducer';

describe('OrderReducer', () => {
  let initialState: Order;
  beforeEach(() => {
    initialState = [
      { name: 'FirstHero', description: 'This is the first hero' },
      { name: 'SecondHero', description: 'This is the second hero' },
      { name: 'ThirdHero', description: 'This is the third hero' }
    ];
  });

  it('called with AddHero action should return a state with the added hero', () => {
    const addedHero = { name: 'AddedHero', description: 'This is the added hero' };
    const expectedState = [...initialState, addedHero];
    expect(orderReducer(initialState, new AddOrder(addedHero))).toEqual(expectedState);
  });

  it('called with RemoveHero action should return a state with the correct hero deleted', () => {
    const indexOfTheHeroToBeRemoved = 1;
    const expectedState = [
      { name: 'FirstHero', description: 'This is the first hero' },
      { name: 'ThirdHero', description: 'This is the third hero' }
    ];

    expect(orderReducer(initialState, new RemoveOrder(indexOfTheHeroToBeRemoved))).toEqual(expectedState);
  });
});
