const moment = require('moment');

module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .click('button')
      .pause(1000)
      .waitForElementVisible('input[name=email]')
      .setValue('input[name=email]', 'food@circle.com')
      .setValue('input[name=password]', 'foodcircle')
      .waitForElementVisible('button')
      .click('button')
      .pause(1500)
      .assert.title('Book A Meal')
      .assert.containsText('div.sidenav-title h3 a[href="/"]', 'BOOK-A-MEAL')
      .assert.containsText('div.username-circle p', 'F');
  },

  'Caterer should be able to view a dashboard and see menu-links': (client) => {
    client
      .elements('css selector', '.sidenav-body .menu-item', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Dashboard');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Meals');
        });
        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Menu');
        });
        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Orders');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to view a dashboard and see the order summary cards for the current day': (client) => {
    client
      .assert.visible('.card.total-sum')
      .assert.containsText('.card.total-sum .count', '4')
      .assert.containsText('.card.total-sum div:not(.count)', 'Today\'s Orders')
      .assert.visible('.card.pending')
      .assert.containsText('.card.pending .count', '3')
      .assert.containsText('.card.pending div:not(.count)', 'Pending Orders')
      .assert.visible('.card.total-cash')
      .assert.containsText('.card.total-cash .count', '4000')
      .assert.containsText('.card.total-cash div:not(.count)', 'Today\'s Revenue')
      .pause(1000)
      .end();
  },

  'Caterer should be able to view a dashboard and see the order summary table for the current day': (client) => {
    client
      .assert.visible('table')
      .assert.containsText('button.warning', 'Deliver')
      .elements('css selector', 'tbody tr td', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, '1');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, '-Eba and Ogbono Soup\n-Semo and Egusi Soup');
        });
        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Emiola Olasanmi');
        });
        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.assert.equal(res.value, '₦8000');
        });
        client.elementIdText(elements.value[4].ELEMENT, (res) => {
          client.assert.equal(res.value, `${moment().format('dddd, Do MMMM YYYY')} 03.47 03`);
        });
        client.elementIdText(elements.value[5].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Deliver');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to deliver an order from the dashboard': (client) => {
    client
      .waitForElementVisible('button.warning')
      .assert.containsText('button.warning', 'Deliver')
      .click('button.warning')
      .pause(3000)
      .assert.containsText('.success', 'Delivered')
      .pause(1000)
      .end();
  },
};
