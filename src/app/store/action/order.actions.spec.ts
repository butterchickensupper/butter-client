import * as fromOrder from './order.actions';

describe('Order action', () => {
  it('should return an action', () => {
    expect(fromOrder.loadOrder().type).toBe('[Order] Order');
  });
});
