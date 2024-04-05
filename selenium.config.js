module.exports = {
  baseURL: 'https://selenium-release.storage.googleapis.com',
  version: '3.9.1',
  drivers: {
    chrome: {
      version: '2.41',
      arch: process.arch,
      baseURL: 'https://chromedriver.storage.googleapis.com',
    }
  },
};
