module.exports = {
  beforeEach(client) {
    client
      .url('http://localhost:8000')
      .windowMaximize()
      .waitForElementVisible('body', 5000)
      .click('button')
      .pause(1000)
      .waitForElementVisible('div.title h2')
      .assert.containsText('div.title h2', 'Welcome Back');
  },

  'Customer should be able to signup with valid input details': (client) => {
    client
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
      .pause(1500)
      .end();
  },

  'Customer should not be able to signup with existing email': (client) => {
    client
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
      .setValue('input[name=email]', 'olisa@emodi.com')
      .setValue('input[name=password]', 'olashaguy')
      .setValue('input[name=passwordConfirm]', 'olashaguy')
      .click('button')
      .pause(5000)
      .assert.containsText('p.danger', 'Email already in use')
      .pause(1500)
      .end();
  },

  'Customer should not be able to signup with invalid input details': (client) => {
    client
      .assert.visible('p a[href="/signup?role=customer"]')
      .click('p a[href="/signup?role=customer"]')
      .pause(1000)
      .assert.containsText('div.title h2', 'Start Filling Your Belly')
      .setValue('input[name=firstname]', '1234&&')
      .click('input[name=lastname]')
      .assert.containsText('input[name=firstname] + div.invalid-feedback', 'Only letters and the characters \'- allowed!')
      .setValue('input[name=lastname]', 'dfgyhkjlghjvbknlmhkjlnfdtyuifghjkgjhkcghjkgfchvjbgvhbjnvhbjngvbn')
      .click('input[name=email]')
      .assert.containsText('input[name=lastname] + div.invalid-feedback', 'Must be 40 characters or less!')
      .setValue('input[name=email]', 'ola@com')
      .click('input[name=password]')
      .assert.containsText('input[name=email] + div.invalid-feedback', 'Invalid email address!')
      .setValue('input[name=password]', 'olash')
      .click('input[name=passwordConfirm]')
      .assert.containsText('input[name=password] + div.invalid-feedback', 'Must be 8 characters or more!')
      .setValue('input[name=passwordConfirm]', 'olashaguy')
      .click('input[name=firstname]')
      .assert.containsText('input[name=passwordConfirm] + div.invalid-feedback', 'Passwords do not match')
      .pause(1500)
      .end();
  },

  'Caterer should be able to signup with valid input details': (client) => {
    client
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
      .pause(1500)
      .end();
  },

  'Caterer should not be able to signup with existing email': (client) => {
    client
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
      .setValue('input[name=businessName]', 'Lalayum2')
      .setValue('input[name=email]', 'lala@yum.com')
      .setValue('input[name=password]', 'lalayumyum')
      .setValue('input[name=passwordConfirm]', 'lalayumyum')
      .setValue('input[name=phoneNo]', '08123456789')
      .setValue('input[name=address]', '3, Church Street, Yaba')
      .click('button')
      .pause(5000)
      .assert.containsText('p.danger', 'Email already in use')
      .pause(1500)
      .end();
  },

  'Caterer should not be able to signup with existing business name': (client) => {
    client
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
      .setValue('input[name=businessName]', 'FoodCircle')
      .setValue('input[name=email]', 'lala@yum2.com')
      .setValue('input[name=password]', 'lalayumyum')
      .setValue('input[name=passwordConfirm]', 'lalayumyum')
      .setValue('input[name=phoneNo]', '08123456789')
      .setValue('input[name=address]', '3, Church Street, Yaba')
      .click('button')
      .pause(5000)
      .assert.containsText('p.danger', 'Business name already in use')
      .pause(1500)
      .end();
  },

  'Caterer should not be able to signup with invalid input details': (client) => {
    client
      .assert.visible('p a[href="/signup?role=caterer"]')
      .click('p a[href="/signup?role=caterer"]')
      .pause(1000)
      .assert.containsText('div.title h2', 'Start Serving Customers')
      .setValue('input[name=businessName]', '$5bddm,')
      .click('input[name=email]')
      .assert.containsText('input[name=businessName] + div.invalid-feedback', 'Only letters, numbers, spaces and the characters (,.\'-) allowed!')
      .setValue('input[name=email]', 'ola@com')
      .click('input[name=password]')
      .assert.containsText('input[name=email] + div.invalid-feedback', 'Invalid email address!')
      .setValue('input[name=password]', 'olash')
      .click('input[name=passwordConfirm]')
      .assert.containsText('input[name=password] + div.invalid-feedback', 'Must be 8 characters or more!')
      .setValue('input[name=passwordConfirm]', 'olashaguy')
      .click('input[name=phoneNo]')
      .assert.containsText('input[name=passwordConfirm] + div.invalid-feedback', 'Passwords do not match')
      .setValue('input[name=phoneNo]', '053427191')
      .click('input[name=address]')
      .assert.containsText('input[name=phoneNo] + div.invalid-feedback', 'Phone number is invalid, must be in the format 080xxxxxxxx')
      .setValue('input[name=address]', '3')
      .click('input[name=phoneNo]')
      .assert.containsText('input[name=address] + div.invalid-feedback', 'Must be 5 characters or more!')
      .pause(1500)
      .end();
  },
};
