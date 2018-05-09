import moment from 'moment';

const userMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsujsdbcuydsiudsy';
const adminMockToken = '68734hjsdjkjksdjkndjsjk78938823sdvzgsuydsugsup[d73489jsdbcuydsiudsy';
const currentDay = moment().format('YYYY-MM-DD');
const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');
const twoDaysTime = moment().add(2, 'days').format('YYYY-MM-DD');

export default {
  tomorrow,
  currentDay,
  twoDaysTime,
  adminMockToken,
  userMockToken,

  login: {
    existingUser: {
      email: 'iveren@shaguy.com',
      password: 'iverenshaguy',
    },

    nonExistingUser: {
      email: 'favo@shag.com',
      password: 'favourshagy',
    },

    wrongData: {
      email: ''
    }
  },

  signup: {
    rightUserData: {
      role: 'user',
      firstname: 'Favour',
      email: 'favour@shaguy.com',
      password: 'favourshaguy',
      passwordConfirm: 'favourshaguy'
    },

    rightCatererData: {
      role: 'caterer',
      businessName: 'We Cook',
      email: 'wecook@cook.com',
      password: 'wecookgoofood',
      passwordConfirm: 'wecookgoofood',
      businessPhoneNo: '+2348134567890',
      businessAddress: '4, Church Street, Yaba',
    },

    wrongUserData: {
      role: 'user',
      firstname: '',
      email: 'favour@shaguy',
      password: 'favou',
      passwordConfirm: 'favourshaguy',
      businessName: 'Foodie',
      businessPhoneNo: '+2348134567890',
      businessAddress: '4, Church Street, Yaba',
    },

    wrongCatererData: {
      role: 'caterer',
      businessName: '',
      firstname: 'Iveren',
      email: 'food@circle',
      password: 'foodc',
      passwordConfirm: 'foodcircle',
      businessPhoneNo: '+234813456',
    },

    wrongRoleUserData: {
      role: 'person',
      firstname: 'Favour{}',
      email: 'favour@shaguy.com',
      password: 'favourshaguy',
      passwordConfirm: 'favourshaguy'
    },

    wrongLengthCatererData: {
      role: 'caterer',
      businessName: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
      Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`,
      email: 'wecook@cook.com',
      password: 'wecookgoofood',
      passwordConfirm: 'wecookgoofood',
      businessAddress: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
      Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
      Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet 
      lorem dui, at ultrices purus lacinia in. Integer consequat eros consequat, 
      ornare felis et, faucibus diam. Suspendisse et consequat diam. 
      Duis id tincidunt diam. Nulla ac quam mattis, congue leo vel, rutrum elit. Sed id dolor
       ut lacus vehicula vulputate. Donec dui ex, fringilla vel facilisis a, iaculis id sem`,
    },

    wrongCatererDataFormat: {
      role: 'caterer',
      firstname: 'Favour',
      businessName: 'ijjjk89877jjjk',
      businessPhoneNo: 'ijjjk89877jjjk',
      businessAddress: 'uiiowe,ksdyuil&9jk',
    },

    longFirstName: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Aenean malesuada lorem non elit cursus, non sodales orci volutpat. 
    Suspendisse eleifend sed libero dignissim mollis. Nullam imperdiet`,
  },

  addMeal: {
    newMeal: {
      title: 'Oriental Fried Rice and Turkey',
      description: 'Contains Sea Food',
      price: 2200,
      imageURL: 'images.com/imgurl1.jpeg',
      forVegetarians: false
    },

    badMeal: {
      title: 'Jollof Spaghetti, Plantain and Turkey',
      description: 'Contains %%% Sea Food',
      price: '',
      imageURL: 'images.com/imgurl1.jpeg',
      forVegetarians: 'no'
    },
  },

  editMeal: {
    newMeal: {
      title: 'Jollof Spaghetti, Plantain and Chicken',
      description: 'Contains Sea Food',
      price: 2400,
      imageURL: 'images.com/imgurl4.jpeg',
    },

    badMeal: {
      title: '',
      description: 'Contains %%% Sea Food',
      price: '23yu50',
      imageURL: 'images.com/imgurl1.jpeg',
      forVegetarians: 'no'
    }
  },

  addMenu: {
    menu1: {
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    menu2: {
      date: twoDaysTime,
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    menu3: {
      date: '2016-01-02',
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ]
    },

    badMenu: {
      date: '30-04-2018',
      meals: [
        '72a3417e-45c8-4559ie-8b74-8b5a61be8614',
        '8a65538d-f862-420e78-bcdc-80743df06578',
        'f9eb7652-125a-4bcbuu-ad81-02f84901cdc3',
      ]
    },
  },

  addOrder: {
    validOrder: {
      meals: [
        '81211c24-51c0-46ec-b1e0-18db55880958',
        '81211c24-51c0-46ec-b1e0-18db55880958',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
    },

    inValidOrder: {
      meals: [
        '8a65538d-f862-420e-bcdc-80743df06578',
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
    },

    newOrder: {
      meals: [
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3',
      ],
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890',
    },

    badOrder: {
      deliveryAddress: '',
      deliveryPhoneNo: 'disdod'
    },

    orderWithExpiredMenu: {
      mealId: 'a3c35e8f-da7a-4113-aa01-a9c0fc088539',
      deliveryAddress: '4, Church Street, Yaba',
      deliveryPhoneNo: '+2348134567890'
    },
  },

  helpers: {
    isUsersMeal: {
      UUIDArr1: [
        '81211c24-51c0-46ec-b1e0-18db55880958',
        '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ],

      UUIDArr2: `[
        '81211c24-51c0-46ec-b1e0-18db55880958',
        '36d525d1-efc9-4b75-9999-3e3d8dc64ce3',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ]`,

      badUUIDArr: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ]
    },
    checkMealsId: {
      arr1: ['iieie', 'siioe'],
      arr2: "['iieie', 'siioe']",
      UUIDArr1: [
        '91b6e41c-0972-4ac5-86da-4ac1f5226e83',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
      ],
      UUIDArr2: `[
        '91b6e41c-0972-4ac5-86da-4ac1f5226e83',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'f9eb7652-125a-4bcb-ad81-02f84901cdc3'
      ]`,
    },
    removeDuplicates: {
      dupArr1: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
      ],
      fltrdArr1: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
      ],
      dupArr2: `[
        '81211c24-51c0-46ec-b1e0-18db55880958',
        '81211c24-51c0-46ec-b1e0-18db55880958'
      ]`,
      fltrdArr2: [
        '81211c24-51c0-46ec-b1e0-18db55880958'
      ],
      uniqueArr: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631'
      ]
    },

    orderItems: {
      badMeal: {
        meals: ['81211c24-51c0-46ec-b1e0-18db55kdfkod880958', ''],
      }
    },

    createMealOrderData: {
      dupArr: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
        '8a65538d-f862-420e-bcdc-80743df06578',
      ],

      arr: [
        '72a3417e-45c8-4559-8b74-8b5a61be8614',
        '8a65538d-f862-420e-bcdc-80743df06578',
        'baa0412a-d167-4d2b-b1d8-404cb8f02631',
      ]
    }
  }
};
