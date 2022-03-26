import { AddOrder, RemoveOrder } from './order.actions';

describe('OrderAction', () => {
  it('should create an AddOrder Action', () => {
    expect(new AddOrder({ name: 'TheHolyTester', address: '123 Main St', items: [] })).toBeTruthy();
  });

  it('should create a RemoveOrder Action', () => {
    expect(new RemoveOrder(1)).toBeTruthy();
  });
});
