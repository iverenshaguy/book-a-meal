export default {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      userId: '8356954a-9a42-4616-8079-887a73455a7f',
      firstname: null,
      lastname: null,
      businessName: 'FoodCircle',
      email: 'food@circle.com',
      password: '$2b$10$ckZlQ80IJTrVo8xnZgkh9Ojrr36Zu2S72Ny50Dz2co1yLhnK36d6u',
      phoneNo: '+2348134567890',
      address: '4, Church Street, Yaba',
      createdAt: '2018-05-06T00:47:03.687Z',
      updatedAt: '2018-05-06T00:47:03.687Z',
      role: 'caterer'
    },
    {
      userId: '61bb8f8d-3b59-4294-acbc-16623818c391',
      firstname: 'Iveren',
      lastname: 'Shaguy',
      businessName: null,
      email: 'iveren@shaguy.com',
      password: '$2b$10$QN.jo4y9xjHZjAt60qyoXeh1ORTJZh8e7RfVf.8kD27rDaZyAEI.i',
      phoneNo: null,
      address: null,
      createdAt: '2018-05-06T00:47:03.687Z',
      updatedAt: '2018-05-06T00:47:03.687Z',
      role: 'admin'
    },
    {
      userId: 'e42c7ce0-958e-4368-adcb-e5d97dbbe5b7',
      firstname: 'Olisa',
      lastname: 'Emodi',
      businessName: null,
      email: 'olisa@emodi.com',
      password: '$2b$10$EA0Ek/u52YFOOxiND8JNU.jId00rANROMfSJGPJcr427mNMpY.8Lu',
      phoneNo: null,
      address: null,
      createdAt: '2018-05-06T00:47:03.687Z',
      updatedAt: '2018-05-06T00:47:03.687Z',
      role: 'customer'
    },
    {
      userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
      firstname: 'Emiola',
      lastname: 'Olasanmi',
      businessName: null,
      email: 'emiola@olasanmi.com',
      password: '$2b$10$0ELLNs7QUfV3EV3OK/Zj4.HxNDAV8pi6dJ3tDGiPHBKN.kWJezyhO',
      phoneNo: null,
      address: null,
      createdAt: '2018-05-06T00:47:03.687Z',
      updatedAt: '2018-05-06T00:47:03.687Z',
      role: 'customer'
    },
    {
      userId: 'ac1b253c-6b33-439b-ab6f-805a4fdd2e05',
      firstname: null,
      lastname: null,
      businessName: 'BellyFill',
      email: 'belly@fill.com',
      password: '$2b$10$7Td1j298HmZf4EKVDz4pOeuuFin/SKv7MCopvaADE7b8vQZ5nKdCa',
      phoneNo: '+2348134567890',
      address: '4, Church Street, Yaba',
      createdAt: '2018-05-06T00:47:03.687Z',
      updatedAt: '2018-05-06T00:47:03.687Z',
      role: 'caterer'
    }
  ]),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
