export default {
  up: queryInterface => queryInterface.bulkInsert('MenuMeals', [
    {
      id: 1,
      mealId: '81211c24-51c0-46ec-b1e0-18db55880958',
      menuId: 'a9fa6cb3-9f5e-46fa-b641-388f898ca824',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 2,
      mealId: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      menuId: 'a9fa6cb3-9f5e-46fa-b641-388f898ca824',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 3,
      mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
      menuId: 'a9fa6cb3-9f5e-46fa-b641-388f898ca824',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 4,
      mealId: 'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      menuId: 'a9fa6cb3-9f5e-46fa-b641-388f898ca824',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 5,
      mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
      menuId: '1adfcfe7-c66d-42d2-82fd-39c1decd290a',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 6,
      mealId: '3ec802c6-0a32-4d29-b27b-42e0f4b532dd',
      menuId: '1adfcfe7-c66d-42d2-82fd-39c1decd290a',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 7,
      mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614',
      menuId: '3a4fb034-6e52-4bde-9abc-91119a39478d',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 8,
      mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614',
      menuId: 'f43f3d49-a6c9-476d-b65a-1af772ff0f36',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 9,
      mealId: '46ced7aa-eed5-4462-b2c0-153f31589bdd',
      menuId: 'f43f3d49-a6c9-476d-b65a-1af772ff0f36',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 10,
      mealId: '91b6e41c-0972-4ac5-86da-4ac1f5226e83',
      menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 11,
      mealId: 'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 12,
      mealId: '8a65538d-f862-420e-bcdc-80743df06578',
      menuId: '15421f7a-0f82-4802-b215-e0e8efb6bfb3',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 13,
      mealId: '81211c24-51c0-46ec-b1e0-18db55880958',
      menuId: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 14,
      mealId: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      menuId: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 15,
      mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
      menuId: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      id: 16,
      mealId: 'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      menuId: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
  ]),

  down: queryInterface => queryInterface.bulkDelete('MenuMeals', null, {})
};
