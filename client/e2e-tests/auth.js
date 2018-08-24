module.exports = {
  'Authentication: Login': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('button')
      .click('button')
      .pause(1000)
      .assert.containsText('div.title h2', 'Welcome Back')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('p a[href="/signup?role=customer"]')
      .assert.visible('p a[href="/signup?role=caterer"]')
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi')
      .click('button')
      .pause(3000)
      .assert.containsText('div.navlinks h3', 'Welcome, Olisa')
      .end();
  },

  'Authentication: Customer Signup': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('button')
      .click('button')
      .pause(1000)
      .assert.visible('p a[href="/signup?role=customer"]')
      .click('p a[href="/signup?role=customer"]')
      .pause(1000)
      .assert.containsText('div.title h2', 'Start Filling Your Belly')
      .assert.visible('input[name=firstname]')
      .assert.visible('input[name=lastname]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=passwordConfirm]')
      .setValue('input[name=firstname]', 'Ola')
      .setValue('input[name=lastname]', 'Shaguy')
      .setValue('input[name=email]', 'ola@shaguy.com')
      .setValue('input[name=password]', 'olashaguy')
      .setValue('input[name=passwordConfirm]', 'olashaguy')
      .click('button')
      .pause(5000)
      .assert.containsText('div.navlinks h3', 'Welcome, Ola')
      .end();
  },

  'Authentication: Caterer Signup': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.visible('button')
      .click('button')
      .pause(1000)
      .assert.visible('p a[href="/signup?role=caterer"]')
      .click('p a[href="/signup?role=caterer"]')
      .pause(1000)
      .assert.containsText('div.title h2', 'Start Serving Customers')
      .assert.visible('input[name=businessName]')
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('input[name=passwordConfirm]')
      .assert.visible('input[name=phoneNo]')
      .assert.visible('input[name=address]')
      .setValue('input[name=businessName]', 'Lalayum')
      .setValue('input[name=email]', 'lala@yum.com')
      .setValue('input[name=password]', 'lalayumyum')
      .setValue('input[name=passwordConfirm]', 'lalayumyum')
      .setValue('input[name=phoneNo]', '08123456789')
      .setValue('input[name=address]', '3, Church Street, Yaba')
      .click('button')
      .pause(5000)
      .assert.containsText('div.username-circle p', 'L')
      .end();
  }
};
