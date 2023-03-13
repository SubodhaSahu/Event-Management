import axios from 'axios';

const baseURL = process.env.REACT_APP_API;
const isLoggedIn = localStorage.getItem('isLoggedIn');

// const getRefreshToken = () => {
//     let accessToken = '';
//     if (isLoggedIn) {
//         let userInfo = localStorage.getItem('userInfo');
//         userInfo = JSON.parse(userInfo);
//         accessToken = userInfo.refreshToken || '';
//     }
//     return accessToken;
// };

// Function to refresh the access token using the refresh token
async function refreshAccessToken() {
    const accessToken = JSON.parse(localStorage.getItem('refreshToken'));
    try {
      const response = await axios.post(`${baseURL}auth/refresh`, {
        refreshToken: accessToken
      });
      return response.data;
    } catch (err) {
      return err;
    }
}

const _axios = axios.create({
    baseURL
});

// Add a request interceptor
_axios.interceptors.request.use(
    config => {
        const configuration = config;

        // Set Auth token in the header
        if (isLoggedIn) {
            const token = JSON.parse(localStorage.getItem('token'));
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
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            (async () => {
                const { token, refreshToken } = await refreshAccessToken();
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('token');
                localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
                localStorage.setItem('token', JSON.stringify(token));
                axios.defaults.headers.common.Authorization = token;
            })();

            return _axios(originalRequest);
        }
        // return Error object with Promise
        return Promise.reject(error);
    }  
);

export default _axios;
