import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import apis from '../repositories/api';
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext();
const defaultErrorMessage = 'Something went wrong. Please try after sometime';

export const AuthProvider = ({ children }) => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [splashLoading, setSplashLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const [signupError, setSignupError] = useState();
  const [token, setToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const register = async (name, email, password) => {
      setIsLoading(true);
      
      try {
        const response = await apis.signup({ email, password, name });
        const { userInfo } = response.data;
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        await AsyncStorage.setItem('token', response.data.token);
        //AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('refreshToken', response.data.refreshToken);
        setUserInfo(userInfo);
        setToken(response.data.token)
        setRefreshToken(response.data.refreshToken)
        //navigation.navigate("Login")
  
      } catch (err) {  
        let errMsg = defaultErrorMessage;
        if (err.response.data.message) {
          errMsg = err.response.data.message;
        }
        setSignupError(errMsg);
      } finally {
        setIsLoading(false); // Hide the Loader
      }
  };

  const login = async (email, password) => {
      setIsLoading(true);
      
      try {
        const response = await apis.login({ email, password });
        const { userInfo } = response.data;
        console.log(response.data);
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('refreshToken',  response.data.refreshToken);
        setToken(response.data.token)
        setRefreshToken(response.data.refreshToken)
        setUserInfo(userInfo);
       // navigation.navigate("Dashboard")
  
      } catch (err) {  
          let errMsg = defaultErrorMessage;
            if (err.response.data.message) {
            errMsg = err.response.data.message;
            }
            setLoginError(errMsg);
      } finally {
        setIsLoading(false); // Hide the Loader
      }
  };

  const logout = () => {
    console.log('Logout')
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('refreshToken');
    setUserInfo({});
    setToken('');
    setRefreshToken('');
   // navigation.navigate("Login")
    //navigation.navigate("Login")
  };

  const isLoggedIn = async () => {
    try {
      setSplashLoading(true);

      let userInfo = await AsyncStorage.getItem('userInfo');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserInfo(userInfo);
      }

      setSplashLoading(false);
    } catch (e) {
      setSplashLoading(false);
      console.log(`is logged in error ${e}`);
    }
  };

    useEffect(() => {
      isLoggedIn();
    }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        userInfo,
        splashLoading,
        register,
        login,
        logout,
        signupError,
        loginError,
        token,
        refreshToken
      }}>
      {children}
    </AuthContext.Provider>
  );
};