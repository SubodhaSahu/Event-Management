import axios from 'axios';

const baseURL = process.env.REACT_APP_API;

const _axios = axios.create({
    baseURL
    // headers: {
    //     'Content-type': 'application/x-www-form-urlencoded',
    //     Accept: 'application/vnd.api+json'
    // }
});

// Add a request interceptor
_axios.interceptors.request.use(
(config) => 
    // Do something before request is sent
     config,
   (error) => 
    // Do something with request error
     Promise.reject(error)
  );
// const tokenR = '';// Will Fetch from the local storage in future
    
// Add a request interceptor

// Add a request interceptor
// _axios.interceptors.request.use((config) => {
//       console.log('Success');
//       return config;
//     }, (error) => {
//       console.log('Failed');
//       return Promise.reject(error);
//     });
// _axios.interceptors.request.use(
//     config => {
//         const token = tokenR;
//         if (token) {
//             // eslint-disable-next-line no-param-reassign
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//       return config;
//     },
//     error => {
//       Promise.reject(error);
//     }
// );

// Add a response interceptor
_axios.interceptors.response.use(
    (response) => 
        // Do something with response data
         response,    
    (error) => 
        // Do something with response error
        // console.log(error);

         Promise.reject(error)
    
);

export default _axios;
