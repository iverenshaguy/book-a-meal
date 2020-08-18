import moment from 'moment';

const currentDay = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
const twoDaysTime = moment().add(2, 'days').format('YYYY-MM-DD');

export default {
  tomorrow,
  currentDay,
  twoDaysTime,

  login: {
    existingUser: {
      email: 'iveren@shaguy.com',
      password: 'iverenshaguy',
    },

    nonExistingUser: {
      email: 'favo@shag.com',
      password: 'favourshagy',
    },

    invalidUser: {
      email: ''
    }
  },

  signup: {
    rightUserDetails: {
      role: 'customer',
      firstname: 'Favour',
      lastname: 'Shaguy',
      email: 'favour@shaguy.com',
      password: 'favourshaguy',
      passwordConfirm: 'favourshaguy'
    },

    rightCatererDetails: {
      role: 'caterer',
      businessName: 'We Cook',
      email: 'wecook@cook.com',
      password: 'wecookgoofood',
      passwordConfirm: 'wecookgoofood',
      phoneNo: '08123456789',
      address: '4, Church Street, Yaba',
    },

    wrongUserDetails: {
      role: 'customer',
      firstname: '',
      email: 'favour@shaguy',
      password: 'favou',
      passwordConfirm: 'favourshaguy',
      businessName: 'Foodie',
      phoneNo: '08123456789',
      address: '4, Church Street, Yaba',
    },

    wrongCatererDetails: {
      role: 'caterer',
      businessName: '',
      firstname: 'Iveren',
      email: 'food@circle',
      password: 'foodc',
      passwordConfirm: 'foodcircle',
      phoneNo: '0813456',
    },

    wrongRoleUserDetails: {
      role: 'person',
      firstname: 'Favour{}',
      email: 'favour@shaguy.com',
      password: 'favourshaguy',
      passwordConfirm: 'favourshaguy'
    },

    wrongLengthCatererDetails: {
      role: 'caterer',
      businessName: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
      Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`,
      email: 'wecook@cook.com',
      password: 'wecookgoofood',
      passwordConfirm: 'wecookgoofood',
      address: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
      Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet 
      lorem dui, at ultrices purus lacinia in. Integer consequat eros consequat, 
      ornare felis et, faucibus diam. Suspendisse et consequat diam. 
      Duis id tincidunt diam. Nulla ac quam mattis, congue leo vel, rutrum elit. Sed id dolor
       ut lacus vehicula vulputate. Donec dui ex, fringilla vel facilisis a, iaculis id sem`,
    },

    invalidCatererDetails: {
      role: 'caterer',
      firstname: 'Favour',
      businessName: 'ijjjk8987&&&7jjjk',
      phoneNo: 'ijjjk89877jjjk',
      address: 'uiiowe,ksdyuil&9jk',
    },

    longName: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
    Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`,
  },

  addMeal: {
    newMealDetails: {
      title: 'Oriental Fried Rice and Turkey',
      description: 'Contains Sea Food',
      price: 2200,
      imageUrl: 'images.com/imgurl1.jpeg',
      vegetarian: false
    },

    invalidMealDetails: {
      title: '',
      description: 'Contains %%% Sea Food',
      price: '',
      imageUrl: 'images.com/imgurl1.jpeg',
      vegetarian: 'no'
    },
  },

  editMeal: {
    updatedMealDetails: {
      title: 'Jollof Spaghetti, Plantain and Chicken',
      description: 'Contains Sea Food',
      price: 2400,
      imageUrl: 'images.com/imgurl4.jpeg',
    },

    invalidMealDetails: {
      title: '',
      description: 'Contains %%% Sea Food',
      price: '23yu50',
      imageUrl: 'images.com/imgurl1.jpeg',
      vegetarian: 'no'
    }
  },

  menu: {
    menuDetailsWithoutDate: {
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    menuDetailsWithDate: {
      date: '2016-01-02',
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    menuDetailsWithFutureDate: {
      date: twoDaysTime,
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    menuDetailsWithBadDate: {
      date: '30-04-2018',
      meals: [
        '72a3417e-45c8-4559ie-8b74-8b5a61be8614',
        '8a65538d-f862-420e78-bcdc-80743df06578',
        'f9eb7652-125a-4bcbuu-ad81-02f84901cdc3',
      ]
    },
  },

  order: {
    validOrderDetails: {
      meals: [
        { mealId: '81211c24-51c0-46ec-b1e0-18db55880958', quantity: 2 },
        { mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 1 }
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '08123456789',
    },

    inValidOrderDetails: {
      meals: [
        { mealId: '8a65538d-f862-420e-bcdc-80743df06578', quantity: 1 }
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '08123456789',
    },

    newOrderDetails: {
      meals: [
        { mealId: 'f9eb7652-125a-4bcb-ad81-02f84901cdc3', quantity: 1 },
        { mealId: 'baa0412a-d167-4d2b-b1d8-404cb8f02631', quantity: 2 }
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '08123456789',
    },

    badOrderDetails: {
      status: 'canceled',
      deliveryAddress: '',
      deliveryPhoneNo: 'disdod'
    },

    orderDetailsWithExpiredMenu: {
      mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '08123456789'
    },
  },

  helpers: {
    isCaterersMeal: {
      arrayOfValidUuids: [
        '81211c24-51c0-46ec-b1e0-18db55880958',
        '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ],

      arrayOfInvalidUuids: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ]
    },

    checkMealsId: {
      arrayOfWrongIds: ['iieie', 'siioe'],
      arrayOfUuids: [
        '91b6e41c-0972-4ac5-86da-4ac1f5226e83',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
      ],
    },

    orderItems: {
      badMeal: {
        meals: [
          { mealId: '81211c24-51c0-46ec-b1e0-18db55kdfkod880958', quantity: 1 },
          { mealId: '', quantity: 1 }
        ],
      }
    }
  }
};
