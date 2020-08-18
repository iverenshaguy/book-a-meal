module.exports = {
  beforeEach(client) {
    client
      .windowMaximize()
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000)
      .waitForElementVisible('div.title h2')
      .assert.containsText('div.title h2', 'Welcome Back');
  },

  'User should be able to login with correct details': (client) => {
    client
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('p a[href="/signup?role=customer"]')
      .assert.visible('p a[href="/signup?role=caterer"]')
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi')
      .click('button')
      .pause(3000)
      .assert.containsText('div.navlinks h3', 'Welcome, Olisa')
      .pause(1000)
      .end();
  },

  'User should not be able to login with wrong password': (client) => {
    client
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('p a[href="/signup?role=customer"]')
      .assert.visible('p a[href="/signup?role=caterer"]')
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olisaemodi2')
      .click('button')
      .pause(3000)
      .assert.containsText('p.danger', 'Invalid Credentials')
      .pause(1000)
      .end();
  },

  'User should be able to login with invalid input details': (client) => {
    client
      .assert.visible('input[name=email]')
      .assert.visible('input[name=password]')
      .assert.visible('p a[href="/signup?role=customer"]')
      .assert.visible('p a[href="/signup?role=caterer"]')
      .setValue('input[name=email]', 'olisa.com')
      .click('input[name=password]')
      .assert.containsText('input[name=email] + div.invalid-feedback', 'Invalid email address!')
      .setValue('input[name=password]', '')
      .click('input[name=email]')
      .assert.containsText('input[name=password] + div.invalid-feedback', 'Required!')
      .pause(1000)
      .end();
  },
};
