import { MenuOrder } from 'src/app/models/order';
import { AddOrder, RemoveOrder } from '../action/order.actions';
import { orderReducer } from './order.reducer';

describe('OrderReducer', () => {
  let initialState: MenuOrder[];
  beforeEach(() => {
    initialState = [
      { quantity: 1, item: { name: 'FirstHero', description: 'This is the first hero', available: 10, imageUrl: '', price: 1.99 } },
      { quantity: 12, item: { name: 'SecondHero', description: 'This is the second hero', available: 13, imageUrl: '', price: 3.99 } }
    ];
  });

  it('called with AddHero action should return a state with the added hero', () => {
    const addedHero = {
      quantity: 1,
      item: { name: 'AddedHero', description: 'This is the added hero', price: 1.99, imageUrl: '', available: 5 }
    };
    const expectedState = [...initialState, addedHero];
    expect(orderReducer(initialState, new AddOrder(addedHero))).toEqual(expectedState);
  });

  it('called with RemoveHero action should return a state with the correct hero deleted', () => {
    const indexOfTheHeroToBeRemoved = 1;
    const expectedState = [
      { quantity: 1, item: { name: 'FirstHero', description: 'This is the first hero', available: 10, imageUrl: '', price: 1.99 } }
    ];

    expect(orderReducer(initialState, new RemoveOrder(indexOfTheHeroToBeRemoved))).toEqual(expectedState);
  });
});
