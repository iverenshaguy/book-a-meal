import { resolve } from 'path';
import { config } from 'dotenv';

config({ path: resolve(__dirname, '../../.env') });

export const initialState = {
  auth: {
    isAuthenticated: true,
    error: null,
    user: { firstname: 'Dave', lastname: 'Smith' },
    loading: false,
    working: false,
    passwordSetSuccess: false,
    mailSendSuccess: false,
  },
  router: {
    location: {
      pathname: '/home',
    },
  },
  toastr: {
    toastrs: [],
    confirm: null,
  },
  meals: {
    items: [],
    working: false,
    error: null,
    metadata: {},
  },
  menu: {
    id: null,
    meals: [],
    working: false,
    isFetching: false,
    error: null,
    currentDay: '1970-01-01',
    metadata: {},
  },
  orders: {
    items: [],
    pendingOrders: 0,
    totalCashEarned: 0,
    delivering: false,
    error: null,
    working: false,
    metadata: {},
  },
  uploadImage: {
    uploadTask: null,
    uploading: false,
    error: null,
    url: null,
  },
  singleOrder: {
    item: null,
    error: null,
  },
  isFetching: false,
  ui: {
    modals: {
      open: false,
      type: null,
    },
    sideNav: {
      open: false,
    },
  },
};

export default initialState;
