export default {
  up: queryInterface => queryInterface.bulkInsert('Menu', [
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      menuId: 'a9fa6cb3-9f5e-46fa-b641-388f898ca824',
      date: '2018-05-06',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      menuId: '1adfcfe7-c66d-42d2-82fd-39c1decd290a',
      date: '2018-04-06',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z'
    },
    {
      userId: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
      menuId: '3a4fb034-6e52-4bde-9abc-91119a39478d',
      date: '2018-05-07',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
      menuId: 'f43f3d49-a6c9-476d-b65a-1af772ff0f36',
      date: '2018-04-06',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
      date: '2018-04-27',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Menu', null, {})
};
