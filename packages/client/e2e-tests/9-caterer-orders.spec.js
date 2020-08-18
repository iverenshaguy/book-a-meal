module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000)
      .waitForElementVisible('input[name=email]')
      .setValue('input[name=email]', 'food@circle.com')
      .setValue('input[name=password]', 'foodcircle')
      .click('button')
      .pause(1500);
  },

  'Caterer should be able to view order history': (client) => {
    client
      .url('http://localhost:8000/orders')
      .pause(3000)
      .elements('css selector', 'div.scroller .order-history-pill span', (elements) => {
        client.assert.equal(elements.value.length, 6);
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to view order details': (client) => {
    client
      .url('http://localhost:8000/orders/ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .waitForElementVisible('div.order-details h3')
      .assert.containsText('div.order-details h3', 'Order #ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .assert.containsText('.success', 'Delivered')
      .pause(1000)
      .end();
  },
};
