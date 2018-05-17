export default {
  up: queryInterface => queryInterface.bulkInsert(
    'OrderItems',
    [
      {
        id: 1,
        mealId: '46ced7aa-eed5-4462-b2c0-153f31589bdd',
        orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25',
        quantity: 2,
        delivered: true,
        createdAt: '2018-04-06T00:47:03.687Z',
        updatedAt: '2018-04-06T00:47:03.687Z'
      },
      {
        id: 2,
        mealId: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
        orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25',
        quantity: 1,
        delivered: true,
        createdAt: '2018-04-06T00:47:03.687Z',
        updatedAt: '2018-04-06T00:47:03.687Z'
      },
      {
        id: 3,
        mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614',
        orderId: 'fb097bde-5959-45ff-8e21-51184fa60c25',
        quantity: 2,
        delivered: true,
        createdAt: '2018-04-06T00:47:03.687Z',
        updatedAt: '2018-04-06T00:47:03.687Z'
      },
      {
        id: 4,
        mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
        orderId: 'ce228787-f939-40a0-bfd3-6607ca8d2e53',
        quantity: 2,
        delivered: true,
        createdAt: '2018-05-06T00:47:03.687Z',
        updatedAt: '2018-05-06T00:47:03.687Z'
      },
      {
        id: 5,
        mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        orderId: 'ce228787-f939-40a0-bfd3-6607ca8d2e53',
        quantity: 2,
        delivered: true,
        createdAt: '2018-05-06T00:47:03.687Z',
        updatedAt: '2018-05-06T00:47:03.687Z'
      }
    ]
  ),

  down: queryInterface => queryInterface.bulkDelete('OrderItems', null, {})
};
