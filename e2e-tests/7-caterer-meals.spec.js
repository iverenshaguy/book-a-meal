const goodImgPath = require('path').resolve(`${__dirname}/testFiles/goodFile.jpg`);
const largeImgPath = require('path').resolve(`${__dirname}/testFiles/largeFile.jpg`);
const badImgPath = require('path').resolve(`${__dirname}/testFiles/badFile.pdf`);

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
      .assert.title('Book A Meal')
      .assert.containsText('div.sidenav-title h3 a[href="/"]', 'BOOK-A-MEAL')
      .assert.containsText('div.username-circle p', 'F')
      .url('http://localhost:8000/meals')
      .waitForElementVisible('.card-group.meals-wrapper');
  },

  'Caterer should be able to see all his meal options on the platform': (client) => {
    client
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 8);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Rice, Beef and Plantain');
        });
        client.elementIdText(elements.value[1].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetable Sharwama and Guava Smoothie');
        });
        client.elementIdText(elements.value[2].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Semo and Egusi Soup');
        });
        client.elementIdText(elements.value[3].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Ewa Agoyin, Plantain and Local Fish');
        });
        client.elementIdText(elements.value[4].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Chicken Sharwama and Banana Smoothie');
        });
        client.elementIdText(elements.value[5].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Eba and Ogbono Soup');
        });
        client.elementIdText(elements.value[6].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Yam and Platain Pottage');
        });
        client.elementIdText(elements.value[7].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Jollof Spaghetti, Plantain and Turkey');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to add a new non-vegetarian meal option with valid details': (client) => {
    client
      .click('.top button')
      .pause(1000)
      .waitForElementVisible('.modal.show')
      .setValue('input[name=title]', 'Spaghetti')
      .setValue('input[name=price]', '1500.99')
      .setValue('input[name=imageUrl]', goodImgPath)
      .pause(10000)
      .setValue('input[name=description]', 'Meal For Netflix and Chill')
      .click('button.btn-block')
      .pause(2000)
      .assert.elementNotPresent('.modal.show')
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Spaghetti');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should be able to add a new vegetarian meal option with valid details': (client) => {
    client
      .click('.top button')
      .pause(1000)
      .waitForElementVisible('.modal.show')
      .setValue('input[name=title]', 'Asparagus Soup')
      .setValue('input[name=price]', '1700')
      .setValue('input[name=description]', 'Stewed asparagus')
      .click('input[name=vegetarian]')
      .click('button.btn-block')
      .pause(1000)
      .assert.elementNotPresent('.modal.show')
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup');
        });
      })
      .elements('css selector', '.meal-card .veg-ribbon', (elements) => {
        client.assert.equal(elements.value.length, 2);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetarian');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should not be able to add a new meal option with invalid details': (client) => {
    client
      .click('.top button')
      .pause(1000)
      .waitForElementVisible('.modal.show')
      .setValue('input[name=title]', 'fghjklytuiodfghjkldfghjklkasdfghjkl asdfghjkl rdtfyghjklertyui sdfghjkfghjkfdghjkgfhj fdghjkghjkghjkfghjk')
      .click('input[name=price]')
      .assert.containsText('input[name=title] + div.invalid-feedback', 'Must be 50 characters or less!')
      .setValue('input[name=price]', '0')
      .click('input[name=description]')
      .assert.containsText('input[name=price] + div.invalid-feedback', 'Must be greater than 0!')
      .setValue('input[name=imageUrl]', largeImgPath)
      .click('input[name=description]')
      .assert.containsText('.file-feedback', 'File Too Large')
      .pause(1000)
      .setValue('input[name=description]', '2345;.,')
      .click('input[name=price]')
      .assert.containsText('input[name=description] + div.invalid-feedback', 'Only letters, numbers, spaces and the characters (,.\'-) allowed!')
      .click('button#modal-close-icon')
      .pause(1000)
      .assert.elementNotPresent('.modal.show')
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup');
        });
      })
      .pause(1000)
      .end();
  },

  'Caterer should not be able to upload a meal with invalid file type': (client) => {
    client
      .click('.top button')
      .pause(1000)
      .waitForElementVisible('.modal.show')
      .setValue('input[name=imageUrl]', badImgPath)
      .click('input[name=description]')
      .assert.containsText('.file-feedback', 'Invalid File Type')
      .pause(1000)
      .end();
  },

  'Caterer should not be able to add a new meal option with a title that already exists': (client) => {
    client
      .click('.top button')
      .pause(1000)
      .waitForElementVisible('.modal.show')
      .setValue('input[name=title]', 'Spaghetti')
      .setValue('input[name=price]', '1500.99')
      .click('button.btn-block')
      .pause(1000)
      .assert.containsText('p.danger.text-center', 'Meal already exists')
      .pause(1000)
      .end();
  },

  'Caterer should be able to modify a meal option': (client) => {
    client

      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup');
        });
      })
      .elements('css selector', '.meal-card-body h3', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, '₦1700.00');
        });
      })
      .elements('css selector', '.meal-card-body p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Stewed asparagus');
        });
      })
      .elements('css selector', '.meal-card .veg-ribbon', (elements) => {
        client.assert.equal(elements.value.length, 2);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Vegetarian');
        });
      })
      .click('button#dropdown-toggler')
      .click('button#edit-meal')
      .pause(1000)
      .waitForElementVisible('.modal.show', 10000)
      .clearValue('input[name=title]')
      .clearValue('input[name=description]')
      .clearValue('input[name=vegetarian]')
      .setValue('input[name=title]', ' with Fish')
      .setValue('input[name=description]', ' with Fish')
      .click('input[name=vegetarian]')
      .click('button.btn-block')
      .pause(1000)
      .assert.elementNotPresent('.modal.show')
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup with Fish');
        });
      })
      .elements('css selector', '.meal-card-body h3', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, '₦1700');
        });
      })
      .elements('css selector', '.meal-card-body p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Stewed asparagus with Fish');
        });
      })
      .elements('css selector', '.meal-card .veg-ribbon', (elements) => {
        client.assert.equal(elements.value.length, 1);
      })
      .pause(1000)
      .end();
  },

  'Caterer should not be able to modify a meal option with meal title that already exists': (client) => {
    client
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup with Fish');
        });
      })
      .click('button#dropdown-toggler')
      .click('button#edit-meal')
      .pause(1000)
      .waitForElementVisible('.modal.show', 10000)
      .setValue('input[name=title]', 'Eba and Ogbono Soup')
      .clearValue('input[name=title]')
      .setValue('input[name=title]', 'Eba and Ogbono Soup')
      .click('button.btn-block')
      .pause(1000)
      .assert.containsText('p.danger.text-center', 'Meal already exists')
      .pause(1000)
      .end();
  },

  'Caterer should be able to delete an existing meal option': (client) => {
    client
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 10);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Asparagus Soup with Fish');
        });
      })
      .click('button#dropdown-toggler')
      .click('button#delete-meal')
      .pause(1000)
      .waitForElementVisible('.modal.show', 10000)
      .click('button#confirm-delete-yes')
      .pause(1000)
      .elements('css selector', '.meal-card .menu-card-title p', (elements) => {
        client.assert.equal(elements.value.length, 9);
        client.elementIdText(elements.value[0].ELEMENT, (res) => {
          client.assert.equal(res.value, 'Spaghetti');
        });
      })
      .pause(1000)
      .end();
  },
};
