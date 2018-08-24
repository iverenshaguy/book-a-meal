module.exports = {
  'Welcome Page': (client) => {
    client
      .url('http://localhost:8000')
      .waitForElementVisible('body', 5000)
      .assert.title('Book A Meal')
      .assert.containsText('div.page-title h3 a[href="/"]', 'BOOK-A-MEAL')
      .assert.containsText('h1', 'Delicious Meals At Your Fingertips')
      .assert.containsText('button', 'I\'M HUNGRY')
      .assert.containsText('a[href="/signin"]', 'Log In')
      .assert.containsText('a[href="/signup"]', 'Sign Up')
      .assert.containsText('div.footer p', '© 2018. Iveren Shaguy. All images were gotten from the internet and are not mine.')
      .end();
  },
};
