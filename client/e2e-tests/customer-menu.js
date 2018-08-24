module.exports = {
  before(client) {
    client
      .url('http://localhost:8000')
      .windowMaximize()
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000);
  },

  after(client) {
    client
      .end();
  },

  'Customer: Menu (Customer can see menu)': (client) => {
    client
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi')
      .click('button')
      .pause(3000)
      .elements('css selector', 'div.meal-card', (elements) => {
        client.expect(elements.value.length).to.equal(4);
      });
  },

  'Customer: Menu (Customer can add menu to cart)': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(3000)
      .assert.containsText('div.order-amount h2', '1500');
  },

  'Customer: Menu (Customer can checkout)': (client) => {
    client
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]');
  }
};
