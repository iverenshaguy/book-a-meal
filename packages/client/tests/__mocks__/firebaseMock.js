const firebasemock = require('firebase-mock');

const mockstorage = new firebasemock.MockStorage();

const mocksdk = new firebasemock.MockFirebaseSdk(
  null,
  null,
  null,
  () => mockstorage,
  null
);

export default mocksdk;
