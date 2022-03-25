import * as fromOrder from './order.actions';

describe('Order action', () => {
  it('should return an action', () => {
    expect(fromOrder.loadOrders().type).toBe('[Order] Orders');
  });
});
