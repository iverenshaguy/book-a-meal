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

  'Customer should be able to see available meal options on the menu for the day': (client) => {
    client
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 4);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetable Sharwama and Guava Smoothie');
        });
        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Semo and Egusi Soup');
        });
      })
      .pause(1000)
      .end();
  },

  'Customer should be able add meal options to cart': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(3000)
      .assert.containsText('div.order-amount h2', '1500')
      .pause(1000)
      .end();
  },

  'Customer should be able to search the available meal options for a meal': (client) => {
    client
      .setValue('input[name=search]', 'sharwama')
      .pause(1000)
      .elements('css selector', 'div.meal-card', (elements) => {
        client.assert.equal(elements.value.length, 1);
        client.assert.containsText('.menu-card-title p', 'Vegetable Sharwama and Guava Smoothie');
      })
      .pause(1000)
      .end();
  },

  'Customer should be able to see a message when no meal options were found': (client) => {
    client
      .setValue('input[name=search]', 'asdfghjk')
      .pause(1000)
      .assert.containsText('p.info', 'No Meals Found')
      .pause(1000)
      .end();
  },

  'Customer should not be able to reduce order item amount to 0 or value less than 0': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(3000)
      .assert.containsText('div.order-amount h2', '1500')
      .setValue('input[type=number]', '0')
      .getValue('input[type=number]', (result) => {
        client.assert.equal(result.value, '10');
      })
      .pause(1000)
      .end();
  },

  'Customer should be able to checkout of the Basket': (client) => {
    client
      .click('button.meal-card-btn')
      .pause(3000)
      .assert.containsText('div.order-amount h2', '1500')
      .url('http://localhost:8000/order-review')
      .assert.containsText('h2', 'Delivery Details')
      .assert.visible('input[name=deliveryPhoneNo]')
      .assert.visible('input[name=deliveryAddress]')
      .pause(1000)
      .end();
  }
};
