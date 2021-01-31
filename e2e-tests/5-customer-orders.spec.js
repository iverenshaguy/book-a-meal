module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000)
      .waitForElementVisible('input[name=email]')
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi')
      .click('button')
      .pause(1500);
  },

  'Customer should not be able to complete an order with empty delivery address and delivery phone no': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .setValue('input[name=deliveryPhoneNo]', '')
      .click('input[name=deliveryAddress]')
      .assert.containsText('input[name=deliveryPhoneNo] + div.invalid-feedback', 'Required!')
      .setValue('input[name=deliveryAddress]', '')
      .click('input[name=deliveryPhoneNo]')
      .assert.containsText('input[name=deliveryAddress] + div.invalid-feedback', 'Required!')
      .pause(1000)
      .end();
  },

  'Customer should not be able to complete an order with invalid order details': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .setValue('input[name=deliveryPhoneNo]', '054363')
      .click('input[name=deliveryAddress]')
      .assert.containsText('input[name=deliveryPhoneNo] + div.invalid-feedback', 'Phone number is invalid, must be in the format 080xxxxxxxx')
      .setValue('input[name=deliveryAddress]', '3')
      .click('input[name=deliveryPhoneNo]')
      .assert.containsText('input[name=deliveryAddress] + div.invalid-feedback', 'Must be 5 characters or more!')
      .pause(1000)
      .end();
  },

  'Customer should be able to complete an order with valid order details': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .setValue('input[name=deliveryPhoneNo]', '08123456789')
      .setValue('input[name=deliveryAddress]', '3, Ayodele Street')
      .click('button[type=submit]')
      .pause(1500)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1500)
      .assert.containsText('.order-status', 'Pending')
      .pause(1000)
      .end();
  },

  'Customer should be able to update an order': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .click('button[type=submit]')
      .pause(1500)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, '1x');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1500)
      .assert.containsText('.order-status', 'Pending')
      .pause(1500)
      .click('button.btn-sec')
      .pause(1500)
      .setValue('input[type="number"]', '2')
      .assert.containsText('div.order-amount h2', '18000')
      .url('http://localhost:8000/order-review')
      .waitForElementVisible('button[type=submit]')
      .click('button[type=submit]')
      .pause(1500)
      .waitForElementVisible('div.order-summary')
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, '12x');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1500)
      .assert.containsText('.order-status', 'Pending')
      .pause(1000)
      .end();
  },

  'Customer should be able to cancel an order': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .click('button[type=submit]')
      .pause(1500)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1500)
      .assert.containsText('.order-status', 'Pending')
      .click('button.btn-sec-danger')
      .pause(1500)
      .assert.containsText('.page-heading h2', 'Today\'s Menu')
      .assert.containsText('.empty-cart p', 'Your Basket is Empty')
      .pause(1000)
      .end();
  },

  'Customer should be able to go back to menu from order confirmation page': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .waitForElementVisible('div.order-amount h2', 5000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .click('button[type=submit]')
      .pause(1500)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
      })
      .click('a[href="/"] button')
      .pause(1500)
      .assert.containsText('.page-heading h2', 'Today\'s Menu')
      .assert.visible('input[name=search]')
      .pause(1000)
      .end();
  },

  'Customer should be able to view order history': (client) => {
    client
      .click('a[href="/orders"]')
      .pause(1500)
      .waitForElementVisible('div.scroller')
      .elements('css selector', 'div.scroller .order-history-pill span', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Canceled');
        });

        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Pending');
        });

        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Pending');
        });

        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Pending');
        });

        client.elementIdText(elements.value[4].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Delivered');
        });

        client.elementIdText(elements.value[5].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Delivered');
        });
      })
      .pause(1000)
      .end();
  },

  'Customer should be able to view order details': (client) => {
    client
      .url('http://localhost:8000/orders/ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .waitForElementVisible('body')
      .waitForElementVisible('div.order-details h3')
      .assert.containsText('div.order-details h3', 'Order #ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .assert.containsText('.order-status', 'Delivered')
      .pause(1000)
      .end();
  },
};
