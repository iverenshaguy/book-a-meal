import jwt from 'jsonwebtoken';
import moment from 'moment';

export const initialState = {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false,
    working: false,
    passwordSetSuccess: false,
    mailSendSuccess: false
  },
  router: {
    location: {
      pathname: '/home'
    }
  },
  toastr: {
    toastrs: [],
    confirm: null
  },
  meals: {
    items: [],
    working: false,
    error: null,
    metadata: {}
  },
  menu: {
    id: null,
    meals: [],
    working: false,
    isFetching: false,
    error: null,
    currentDay: '1970-01-01',
    metadata: {}
  },
  orders: {
    items: [],
    pendingOrders: 0,
    totalCashEarned: 0,
    delivering: false,
    error: null,
    working: false,
    metadata: {}
  },
  uploadImage: {
    uploadTask: null,
    uploading: false,
    error: null,
    url: null
  },
  singleOrder: {
    item: null,
    error: null
  },
  isFetching: false,
  ui: {
    modals: {
      open: false,
      type: null
    },
    sideNav: {
      open: false
    }
  }
};

export const caterer = {
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  businessName: 'Food Circle',
  phoneNo: '08166557788',
  address: '$, Herbert Macaulay Way, Yaba, Lagos',
  role: 'caterer',
  email: 'food@circle.com'
};

export const customer = {
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  firstname: 'Emiola',
  lastname: 'Olasanmi',
  role: 'customer',
  email: 'emiola@olasanmi.com',
};

export const newCustomer = {
  role: 'customer',
  firstname: 'Jane',
  lastname: 'Smithy',
  email: 'janesmithy@gmail.com',
  password: 'janesmithy',
  passwordConfirm: 'janesmithy',
};

export const customerToken = `Bearer ${jwt.sign({
  id: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  email: 'emiola@olasanmi.com',
  role: 'customer',
}, process.env.SECRET, { expiresIn: '1 hour' })}`;

export const catererToken = `Bearer ${jwt.sign({
  id: '8356954a-9a42-4616-8079-887a73455a7f',
  email: 'food@circle.com',
  role: 'caterer',
}, process.env.SECRET, { expiresIn: '1 hour' })}`;

export const expiredToken = `Bearer ${jwt.sign({
  id: '8356954a-9a42-4616-8079-887a73455a7f',
  email: 'food@circle.com',
  role: 'caterer',
}, process.env.SECRET, { expiresIn: -1 })}`;

export const caterersOrdersObj = {
  orders: [
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'delivered',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: true
        }
      ]
    },
    {
      id: 'ce228787-f939-40a0-bfd3-6607ca8d2e53',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'delivered',
      createdAt: '2018-05-01T00:47:03.687Z',
      updatedAt: '2018-05-01T00:47:03.687Z',
      customer: {
        firstname: 'Olisa',
        lastname: 'Emodi',
        email: 'olisa@emodi.com'
      },
      meals: [
        {
          id: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
          title: 'Semo and Egusi Soup',
          imageUrl: 'https://static.pulse.ng/img/incoming/origs7167742/5270485143-w980-h640/Pounded-yam-and-Egusi-soup.jpg',
          description: 'Meal contains 2 pieces of beef and other assorted meat and fish products',
          vegetarian: false,
          price: '2000.00',
          quantity: 2,
          delivered: true
        },
        {
          id: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
          title: 'Eba and Ogbono Soup',
          imageUrl: 'http://www.kalakutahgrills.com/wp-content/uploads/2017/02/my-pics-group-3-007.jpg',
          description: 'Meal contains 2 pieces of beef and other assorted meat and fish products',
          vegetarian: false,
          price: '2000.00',
          quantity: 2,
          delivered: true
        }
      ]
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c26',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'pending',
      createdAt: '2018-05-29T00:47:03.687Z',
      updatedAt: '2018-05-29T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: false
        }
      ]
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c35',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'canceled',
      createdAt: '2018-05-27T00:47:03.687Z',
      updatedAt: '2018-05-27T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: false
        }
      ]
    },
  ],
  totalCashEarned: 9200,
  pendingOrders: 0,
};

export const customersMenuObj = {
  menu: [
    {
      id: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab5',
      date: '2018-05-18',
      caterer: {
        id: '8356954a-9a42-4616-8079-887a73455a7f',
        businessName: 'FoodCircle',
        phoneNo: '080xxxxxxxx',
        address: '4, Church Street, Yaba',
        email: 'food@circle.com'
      },
      meals: [
        {
          id: '81211c24-51c0-46ec-b1e0-18db55880958',
          title: 'Jollof Rice, Beef and Plantain',
          imageUrl: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
          description: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
          vegetarian: false,
          price: '1500.00'
        },
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00'
        }
      ]
    },
    {
      id: '6f27c0fb-19a9-4d9e-b5a1-d97c2d426ab6',
      date: '2018-05-18',
      caterer: {
        id: '8356954a-9a42-4616-8079-887a73455a7g',
        businessName: 'FoodTri',
        phoneNo: '08134567891',
        address: '4, Church Street, Yaba',
        email: 'food@tri.com'
      },
      meals: [
        {
          id: '81211c24-51c0-46ec-b1e0-18db55880959',
          title: 'Jollof Rice',
          imageUrl: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
          description: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
          vegetarian: false,
          price: '1500.00'
        },
      ]
    }
  ]
};

export const caterersOrdersObjPerDay = {
  orders: [
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c35',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'delivered',
      createdAt: '2018-05-27T00:47:03.687Z',
      updatedAt: '2018-05-27T00:47:03.687Z',
      customer: {
        firstname: 'Emiola',
        lastname: 'Olasanmi',
        email: 'emiola@olasanmi.com'
      },
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          quantity: 1,
          delivered: true
        }
      ]
    },
  ],
  totalCashEarned: 1200,
  pendingOrders: 0
};

export const deliverOrder = {
  id: 'fb097bde-5959-45ff-8e21-51184fa60c26',
  deliveryAddress: '4, Church Street, Yaba',
  deliveryPhoneNo: '080xxxxxxxx',
  status: 'delivered',
  createdAt: '2018-05-29T00:47:03.687Z',
  updatedAt: '2018-05-29T00:47:03.687Z',
  customer: {
    firstname: 'Emiola',
    lastname: 'Olasanmi',
    email: 'emiola@olasanmi.com'
  },
  meals: [
    {
      id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Sharwama contains no animal products, perfect for dieters',
      vegetarian: true,
      price: '1200.00',
      quantity: 1,
      delivered: true
    }
  ]
};

export const orderItems = [
  {
    id: 'fb097bde-5959-45ff-8e21-51184fa60c26',
    title: 'Meat Soup',
    price: '2500',
    quantity: 1
  },
  {
    id: 'fb097bde-5959-45ff-8e21-51184fa60f36',
    title: 'Fish Soup',
    price: '2200',
    quantity: 3
  }
];

export const mealsObj = {
  meals: [
    {
      id: '81211c24-51c0-46ec-b1e0-18db55880958',
      title: 'Jollof Rice, Beef and Plantain',
      imageUrl: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
      description: 'Jollof Rice, Beef and Plantain. 2 pieces of beef per plate',
      vegetarian: false,
      price: '1500.00'
    },
    {
      id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Sharwama contains no animal products, perfect for dieters',
      vegetarian: true,
      price: '1200.00'
    }
  ]
};

export const newMeal = {
  id: '81211c24-51c0-46ec-b1e0-18db55880954',
  title: 'Jollof Rice and Chicken',
  imageUrl: 'http://www.preciouscore.com/wp-content/uploads/2017/11/How-to-cook-jollof-rice-in-the-oven-750x500.jpg',
  description: '',
  vegetarian: false,
  price: '2500.00'
};

export const order = [{
  id: '81211c24-51c0-46ec-b1e0-18db55880958',
  title: 'Jollof Rice, Beef and Plantain',
  price: '1500.00',
  quantity: 1
}];

export const orderRequest = {
  deliveryAddress: '4, Church Street, Yaba',
  deliveryPhoneNo: '08134567891',
  meals: [
    { id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3', quantity: 3 },
    { id: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 10 }
  ]
};

export const customerOrder = {
  id: 'f7247d3a-de8a-43e2-90f6-b126cd4c491c',
  deliveryAddress: '4, Church Street, Yaba',
  deliveryPhoneNo: '08134567891',
  status: 'started',
  createdAt: '2018-05-18T16:18:25.303Z',
  updatedAt: '2018-05-18T16:18:25.303Z',
  meals: [
    {
      id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
      title: 'Vegetable Sharwama and Guava Smoothie',
      imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
      description: 'Sharwama contains no animal products, perfect for dieters',
      vegetarian: true,
      price: '1200.00',
      quantity: 1,
      delivered: false
    },
    {
      id: 'baa0412a-d167-4d2b-b1d8-404cb8f02631',
      title: 'Semo and Egusi Soup',
      imageUrl: 'https://static.pulse.ng/img/incoming/origs7167742/5270485143-w980-h640/Pounded-yam-and-Egusi-soup.jpg',
      description: 'Meal contains 2 pieces of beef and other assorted meat and fish products',
      vegetarian: false,
      price: '2000.00',
      quantity: 100,
      delivered: false
    }
  ]
};

export const localStorageOrder = {
  userId: 'a09a5570-a3b2-4e21-94c3-5cf483dbd1ac',
  date: moment().format('YYYY-MM-DD'),
  order: {
    id: null,
    meals: [
      { id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3', quantity: 3 },
      { id: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 10 }
    ],
    deliveryAddress: '4, Church Street, Yaba',
    deliveryPhoneNo: '08134567891',
  }
};

export const customersOrdersObj = {
  orders: [
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa70c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'canceled',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      meals: [
        {
          id: '46ced7aa-eed5-4462-b2c0-153f31589bdd',
          title: 'Adalu (Beans and Corn) and Local Fish ',
          imageUrl: 'http://www.gratednutmeg.com/wp-content/uploads/2015/03/DSC_07722.jpg',
          description: '',
          vegetarian: false,
          price: '2000.00',
          caterer: {
            businessName: 'BellyFill',
            address: '4, Church Street, Yaba',
            phoneNo: '080xxxxxxxx',
            email: 'belly@fill.com'
          },
          quantity: 2,
          delivered: false
        },
      ],
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa60c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'delivered',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          caterer: {
            businessName: 'FoodCircle',
            address: '4, Church Street, Yaba',
            phoneNo: '080xxxxxxxx',
            email: 'food@circle.com'
          },
          quantity: 1,
          delivered: true
        },
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce4',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          caterer: {
            businessName: 'FoodCircle',
            address: '4, Church Street, Yaba',
            phoneNo: '080xxxxxxxx',
            email: 'food@circle.com'
          },
          quantity: 1,
          delivered: true
        }
      ],
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa80c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'pending',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          caterer: {
            businessName: 'FoodCircle',
            address: '4, Church Street, Yaba',
            phoneNo: '080xxxxxxxx',
            email: 'food@circle.com'
          },
          quantity: 1,
          delivered: true
        }
      ],
    },
    {
      id: 'fb097bde-5959-45ff-8e21-51184fa90c25',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '080xxxxxxxx',
      status: 'started',
      createdAt: '2018-04-06T00:47:03.687Z',
      updatedAt: '2018-04-06T00:47:03.687Z',
      meals: [
        {
          id: '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
          title: 'Vegetable Sharwama and Guava Smoothie',
          imageUrl: 'https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&h=350',
          description: 'Sharwama contains no animal products, perfect for dieters',
          vegetarian: true,
          price: '1200.00',
          caterer: {
            businessName: 'FoodCircle',
            address: '4, Church Street, Yaba',
            phoneNo: '080xxxxxxxx',
            email: 'food@circle.com'
          },
          quantity: 1,
          delivered: false
        }
      ],
    }
  ],
  pendingOrders: 0
};

export const metadata = {
  pages: 2,
  total: 5,
  prev: 'prev',
  next: 'next'
};
