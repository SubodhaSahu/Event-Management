import axios from 'axios';

const baseURL = process.env.REACT_APP_API;

class TokenService {
    static getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem('userInfo'));
      return user?.refreshToken;
    }
  
    static getLocalAccessToken() {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        return user?.token;
    }
  
    static updateLocalAccessToken(token, refresh) {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        user.token = token;
        user.refreshToken = refresh;
        localStorage.setItem('userInfo', JSON.stringify(user));
    }

    static removeUser() {
      localStorage.removeItem('userInfo');
    }

    // Function to refresh the access token using the refresh token
    static async refreshAccessToken() {
    const refreshToken = TokenService.getLocalRefreshToken();
    try {
      const response = await axios.post(`${baseURL}auth/refresh`, {
        refreshToken
      });
      return response.data;
    } catch (err) {
      return err;
    }
}
  }
  
  export default TokenService;
