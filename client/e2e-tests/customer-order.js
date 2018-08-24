module.exports = {
  beforeEach(client) {
    client
      .url('http://localhost:8000')
      .windowMaximize()
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000)
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi')
      .click('button')
      .pause(3000);
  },

  'Customer: Order (Customer can complete an order)': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .setValue('input[name=deliveryPhoneNo]', '08123456789')
      .setValue('input[name=deliveryAddress]', '3, Ayodele Street')
      .click('button[type=submit]')
      .pause(1000)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1000)
      .assert.containsText('.order-status', 'Pending')
      .end();
  },

  'Customer: Order (Customer can update an order)': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .click('button[type=submit]')
      .pause(1000)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.expect(res.value).to.equal('1x');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1000)
      .assert.containsText('.order-status', 'Pending')
      .pause(1000)
      .click('button.btn-sec')
      .clearValue('input[type="number"]')
      .setValue('input[type="number"]', '2')
      .assert.containsText('div.order-amount h2', '3000')
      .url('http://localhost:8000/order-review')
      .waitForElementVisible('body', 5000)
      .click('button[type=submit]')
      .pause(1000)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.expect(res.value).to.equal('2x');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1000)
      .assert.containsText('.order-status', 'Pending')
      .end();
  },

  'Customer: Order (Customer can cancel an order)': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .click('button[type=submit]')
      .pause(1000)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Jollof Rice, Beef and Plantain');
        });
      })
      .click('button#checkout')
      .pause(1000)
      .assert.containsText('.order-status', 'Pending')
      .click('button.btn-sec-danger')
      .pause(1000)
      .assert.containsText('.page-heading h2', 'Today\'s Menu')
      .assert.containsText('.empty-cart p', 'Your Basket is Empty')
      .end();
  },

  'Customer: Order (Customer can go back to menu from order confirmation page)': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(1000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .click('button[type=submit]')
      .pause(1000)
      .elements('css selector', 'div.order-summary div p', (elements) => {
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Jollof Rice, Beef and Plantain');
        });
      })
      .click('a[href="/"] button')
      .pause(1000)
      .assert.containsText('.page-heading h2', 'Today\'s Menu')
      .assert.visible('input[name=search]')
      .end();
  },

  'Customer: Order (Customer can view order history)': (client) => {
    client
      .click('a[href="/orders"]')
      .pause(3000)
      .elements('css selector', 'div.scroller .order-history-pill span', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Canceled');
        });

        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Pending');
        });

        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.expect(res.value).to.equal('Delivered');
        });
      })
      .end();
  },

  'Customer: Order (Customer can view order details)': (client) => {
    client
      .click('a[href="/orders"]')
      .pause(3000)
      .click('a[href="/orders/ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .waitForElementVisible('body', 2000)
      .assert.containsText('div.order-details h3', 'Order #ce228787-f939-40a0-bfd3-6607ca8d2e53')
      .assert.containsText('.order-status', 'Delivered')
      .end();
  },
};
