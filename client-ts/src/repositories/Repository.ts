import axios, { AxiosResponse } from 'axios';
import TokenService from '../services/TokenService';

const baseURL = process.env.REACT_APP_API_URL;
const tokenService = new TokenService();

const isLoggedIn = TokenService.isLoggedIn();

const axiosInstance = axios.create({
  baseURL,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const configuration = config;

    // Set Auth token in the header
    if (isLoggedIn) {
      const token = tokenService.getLocalAccessToken() || '';
      configuration.headers.Authorization = token;
    }

    return configuration;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
// Axios interceptor to handle expired tokens
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => response,
  (error) => {
    const originalRequest = error.config;

    if (isLoggedIn && error?.response?.status === 401) {
      (async () => {
        const { token, refreshToken } = await tokenService.refreshAccessToken();
        tokenService.updateLocalAccessToken(token, refreshToken);
        axiosInstance.defaults.headers.common.Authorization = token;
        return axiosInstance(originalRequest);
      })();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
