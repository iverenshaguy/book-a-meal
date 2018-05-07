export default {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Notifications', [
      {
        notifId: '3dc9cc9b-179b-4f0d-ac60-7ca6f4659d79',
        userId: null,
        menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
        orderId: null,
        message: 'Jollof Spaghetti, Plantain and Turkey was just added to the menu',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000'
      },
      {
        notifId: '87a311b7-898b-4a6b-81c2-619417c96432',
        userId: '8356954a-9a42-4616-8079-887a73455a7f',
        menuId: null,
        orderId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
        message: 'Your menu was just ordered',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000'
      },
      {
        notifId: '9015c150-6079-4be6-a240-272a4de6bd17',
        userId: null,
        menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
        orderId: null,
        message: 'Jollof Spaghetti, Plantain and Turkey was just added to the menu',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000'
      },
      {
        notifId: '38eb0942-38b7-4a16-91e9-8b1662175d75',
        userId: null,
        menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
        orderId: null,
        message: 'Jollof Spaghetti, Plantain and Turkey was just added to the menu',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000'
      },
      {
        notifId: 'd886ce22-9b41-4cf6-9dd6-7bdd5476d6c0',
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        menuId: null,
        orderId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
        message: 'Your menu was just ordered',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000'
      }
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('Notifications', null, {})
};
