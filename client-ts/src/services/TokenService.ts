import axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL;

class TokenService {
  user = {};

  getUserInfo(): { refreshToken?: string; token?: string } {
    const userInfo: string | null = localStorage.getItem('userInfo');

    const user: { refreshToken: string; token: string } = JSON.parse(
      userInfo || '{}'
    );

    this.user = user;
    return user;
  }

  static isLoggedIn() {
    const isLoggedIn: string | null = localStorage.getItem('isLoggedIn');
    return isLoggedIn;
  }

  getLocalRefreshToken(): string {
    const user = this.getUserInfo();
    return user?.refreshToken || '';
  }

  getLocalAccessToken(): string {
    const user = this.getUserInfo();
    return user?.token || '';
  }

  updateLocalAccessToken(token: string, refresh: string) {
    const user = this.getUserInfo();
    user.token = token;
    user.refreshToken = refresh;
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem('userInfo');
  }

  async refreshAccessToken() {
    const refreshToken = this.getLocalRefreshToken();
    try {
      const response = await axios.post(`${baseURL}auth/refresh`, {
        refreshToken,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
}

export default TokenService;
