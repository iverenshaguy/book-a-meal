export default {
  up: queryInterface => queryInterface.bulkInsert('Meals', [
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: '81211c24-51c0-46ec-b1e0-18db55880958',
      title: 'Jollof Rice, Beef and Plantain',
      description: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
      price: 1500,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      description: 'Sharwama contains no animal products',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: true,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
      title: 'Semo and Egusi Soup',
      description: 'Meal contains 2 pieces of beef',
      price: 2000,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: 'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      title: 'Ewa Agoyin, Plantain and Local Fish',
      description: '',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
      mealId: '46ced7aa-eed5-4462-b2c0-153f31589bdd',
      title: 'Adalu (Beans and Corn) and Local Fish ',
      description: '',
      price: 2000,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: '8a65538d-f862-420e-bcdc-80743df06578',
      title: 'Chicken Sharwama and Banana Smoothie',
      description: '',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
      title: 'Eba and Ogbono Soup',
      description: 'Meal contains 2 pieces of beef',
      price: 2000,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: '3ec802c6-0a32-4d29-b27b-42e0f4b532dd',
      title: 'Yam and Platain Pottage',
      description: 'Meal come with Fish',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
      mealId: '72a3417e-45c8-4559-8b74-8b5a61be8614',
      title: 'Wheat and Okro Soup',
      description: 'Meal contains 2 pieces of beef',
      price: 2000,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    },
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      mealId: '91b6e41c-0972-4ac5-86da-4ac1f5226e83',
      title: 'Jollof Spaghetti, Plantain and Turkey',
      description: '',
      price: 1200,
      imageUrl: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1532540264/bookameal/default-img.jpg',
      vegetarian: false,
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z'
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Meals', null, {})
};
