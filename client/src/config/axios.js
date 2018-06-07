import axios from 'axios';

// configure base url
const instance = axios.create({
  baseURL: '/api/v1',
});

// intercept requests, add authorization token
// and validate status function
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  config.headers.authorization = `Bearer ${token}`;
  config.validateStatus = status => status >= 200 && status < 300;
  return config;
});

// intercept response and reload page if request error
// is caused by an expired token
instance.interceptors.response.use(
  response => response,
  (error) => {
    const { response: { status, data } } = error;

    if (status === 403 &&
      data.error === 'User authorization token is expired') {
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default instance;
