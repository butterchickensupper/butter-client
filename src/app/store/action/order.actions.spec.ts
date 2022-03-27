import { AddOrder, RemoveOrder } from './order.actions';

describe('OrderAction', () => {
  it('should create an AddOrder Action', () => {
    expect(new AddOrder({ item: { name: 'TheHolyTester', price: 1.11, imageUrl: '', available: 1, description: '' }, quantity: 1 })).toBeTruthy();
  });

  it('should create a RemoveOrder Action', () => {
    expect(new RemoveOrder(1)).toBeTruthy();
  });
});
