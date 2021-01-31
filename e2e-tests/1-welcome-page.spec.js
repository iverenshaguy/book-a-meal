module.exports = {
  'Unauthenticated user should be able to see the welcome page': (client) => {
    client
      .windowMaximize()
      .url('http://localhost:8000')
      .waitForElementVisible('body')
      .waitForElementVisible('h1')
      .assert.title('Book A Meal')
      .assert.containsText('div.page-title h3 a[href="/"]', 'BOOK-A-MEAL')
      .assert.containsText('h1', 'Delicious Meals At Your Fingertips')
      .assert.containsText('button', 'I\'M HUNGRY')
      .assert.containsText('a[href="/signin"]', 'Log In')
      .assert.containsText('a[href="/signup"]', 'Sign Up')
      .assert.containsText('div.footer p', '© 2018. Iveren Shaguy. All images were gotten from the internet and are not mine.')
      .pause(1000)
      .end();
  },
};
