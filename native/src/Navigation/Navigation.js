import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    View,
    Text
  } from "react-native";

import { AuthContext } from '../Context/AuthContext';
import AppStack from './AppStack';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  console.log('Inside navigation');
  const { userInfo, splashLoading, token } = useContext(AuthContext);
  let localToken = '';
  AsyncStorage.getItem("token").then((value) => {
    localToken = value
  });
  if (localToken === '' && token !== '') {
    console.log('Inside navigation localToken//');
    AsyncStorage.setItem('token', token);
  } 

  AsyncStorage.getItem("token").then((value) => {
   console.log('AsyncStorage' + value)
  });
    const isEmpty = token !== '' ? false : true;

    return (<>
        
        {splashLoading ? (
          <Stack.Screen
          name="Splash Screen"
          component={SplashScreen}
          options={{ headerShown: false }}
         />
        ) : token !== '' ? (
          <AppStack />
        ) : (
            <AuthStack />
        )}
    </>)
}

export default Navigation;