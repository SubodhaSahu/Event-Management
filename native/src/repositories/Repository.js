import axios from 'axios';
import { API_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = API_URL;

async function getItem(item) {
    try {
      const value = await AsyncStorage.getItem(item);
      console.log(value);
      return value;
    } catch (error) {
        console.log('getItem')
        console.log(error)
      // Handle errors here
    }
  }

let token = getItem('token');
console.log('INSIDE REPO..');
console.log(token)

AsyncStorage.getItem("token").then((value) => {
    token = value;
});
//const isLoggedIn = localStorage.getItem('isLoggedIn');

const _axios = axios.create({
    baseURL
});

// Add a request interceptor
_axios.interceptors.request.use(
    config => {
        const configuration = config;

        //Set Auth token in the header
        if (token !== '') {
            configuration.headers.Authorization = token;
        }
        
      return configuration;
    },
    error => {
      Promise.reject(error);
    }
);

// Add a response interceptor
// Axios interceptor to handle expired tokens
_axios.interceptors.response.use(
(response) => response, 
    (error) => {
        const originalRequest = error.config;

        // if (isLoggedIn && error.response.status === 401 && !originalRequest._retry) {
        //     originalRequest._retry = true;
        //     (async () => {
        //         const { token, refreshToken } = await TokenService.refreshAccessToken();
        //         TokenService.updateLocalAccessToken(token, refreshToken);
        //         axios.defaults.headers.common.Authorization = token;
        //         return _axios(originalRequest);
        //     })();
        // }
        // return Error object with Promise
        return Promise.reject(error);
    }  
);

export default _axios;
