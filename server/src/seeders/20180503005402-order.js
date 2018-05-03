export default {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Orders', [
      {
        orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25',
        date: '2018-05-15',
        createdAt: '2018-04-06T14:34:90.000',
        updatedAt: '2018-04-06T14:34:90.000',
        userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
        deliveryAddress: '4, Church Street, Yaba',
        deliveryPhoneNo: '+2348134567890'
      },
      {
        orderId: 'ce228787-f939-40a0-bfd3-6607ca8d2e53',
        date: '2018-05-10',
        createdAt: '2018-05-06T14:34:90.000',
        updatedAt: '2018-05-06T14:34:90.000',
        userId: 'e42c7ce0-958e-4368-adcb-e5d97dbbe5b7',
        deliveryAddress: '4, Church Street, Yaba',
        deliveryPhoneNo: '+2348134567890'
      }
    ]);
  },

  down: queryInterface => queryInterface.bulkDelete('Orders', null, {})
};
