import * as fromOrder from './order.actions';

describe('Order action', () => {
  it('should return an action', () => {
    expect(fromOrder.orders().type).toBe('[Order] Orders');
  });
});
