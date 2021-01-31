const moment = require('moment');

const currentYear = moment().format('YYYY');
const futureYear = parseInt(currentYear, 10) + 1;

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
      .pause(1500)
      .url('http://localhost:8000/menu')
      .waitForElementVisible('.card-group.meals-wrapper');
  },

  'Caterer should be able to see available meal options on the menu for a particular day': (client) => {
    client
      .setValue('input[type=date]', '27-4-2018')
      .pause(3000)
      .elements('css selector', 'div.meal-card', (elements) => {
        client.assert.equal(elements.value.length, 3);
        client.assert.containsText('.menu-card-title p', 'Jollof Spaghetti, Plantain and Turkey');
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to see available meal options on the menu for the current day': (client) => {
    client
      .elements('css selector', 'div.meal-card', (elements) => {
        client.assert.equal(elements.value.length, 4);
        client.assert.containsText('.menu-card-title p', 'Jollof Rice, Beef and Plantain');
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to search the available meal options for a meal when setting a menu': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .setValue('input[name=search]', 'sharwama')
      .pause(1000)
      .elements('css selector', '.form-input-checkbox label', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetable Sharwama and Guava Smoothie');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Chicken Sharwama and Banana Smoothie');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to see a message when no meal options were found when setting a menu': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .setValue('input[name=search]', 'asdfghjk')
      .pause(1000)
      .assert.containsText('p.info', 'No Meals Found')
      .pause(1000)
      .end();
  },

  'Caterer should be able to set the menu for a future day': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .pause(1000)
      .setValue('.modal input[type=date]', `27-4-${futureYear}`)
      .pause(1000)
      .click('.modal input[name="36d525d1-efc9-4b75-9999-3e3d8dc64ce3"]')
      .pause(500)
      .click('.modal input[name="baa0412a-d167-4d2b-b1d8-404cb8f02631"]')
      .pause(500)
      .click('.modal button.btn-block')
      .pause(1000)
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 2);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Ewa Agoyin, Plantain and Local Fish');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to set the menu for the day': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .pause(1000)
      .click('.modal input[name="36d525d1-efc9-4b75-9999-3e3d8dc64ce3"]')
      .pause(500)
      .click('.modal input[name="baa0412a-d167-4d2b-b1d8-404cb8f02631"]')
      .pause(500)
      .click('.modal button.btn-block')
      .pause(1000)
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 2);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Ewa Agoyin, Plantain and Local Fish');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to modify the menu for the day': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .pause(1000)
      .click('.modal input[name="36d525d1-efc9-4b75-9999-3e3d8dc64ce3"]')
      .pause(500)
      .click('.modal input[name="baa0412a-d167-4d2b-b1d8-404cb8f02631"]')
      .pause(500)
      .click('.modal input[name="a3c35e8f-da7a-4113-aa01-a9c0fc088539"]')
      .pause(500)
      .click('.modal input[name="3ec802c6-0a32-4d29-b27b-42e0f4b532dd"]')
      .pause(500)
      .click('.modal button.btn-block')
      .pause(1000)
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 6);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Ewa Agoyin, Plantain and Local Fish');
        });
        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetable Sharwama and Guava Smoothie');
        });
        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Semo and Egusi Soup');
        });
        client.elementIdText(elements.value[4].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Eba and Ogbono Soup');
        });
        client.elementIdText(elements.value[5].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Yam and Platain Pottage');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should not be able to set menu for a past date': (client) => {
    client
      .click('button#menu-modal-btn')
      .waitForElementVisible('.modal.show')
      .pause(1000)
      .setValue('.modal input[type=date]', '27-4-2017')
      .pause(1000)
      .click('#modal-close-icon')
      .pause(1000)
      .assert.containsText('.page-title h2', `${moment().format('dddd, Do MMMM YYYY')}`)
      .pause(1000)
      .end();
  },
};
