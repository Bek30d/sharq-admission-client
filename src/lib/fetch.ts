import axios, { AxiosInstance } from 'axios';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    Accept: 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
    'X-USER-TYPE': 'driver',
  },
});

axiosInstance.interceptors.request.use(async config => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
axiosInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    if (error.message === 'Network Error') {
      console.log('Network Error', 'Please check your internet connection');
    }
    if (error.response?.status === 400) {
      console.log('Bad Request', 'Invalid request');
    }
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      console.log('Sessiya tugadi', "Iltimos qayta kirishni urinib ko'ring");
    }

    if (error.response?.status === 403) {
      console.log(
        'Forbidden',
        'You have no permission to access this resource',
      );
    }

    if (error.response?.status === 404) {
      console.log('Not Found', 'Resource not found');
    }
    if (error.response?.status === 500) {
      console.log('Server Error', 'Internal server error');
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
