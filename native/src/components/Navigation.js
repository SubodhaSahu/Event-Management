import React, {useContext, useState} from 'react';
import { Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//import {NavigationContainer} from '@react-navigation/native';
//import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../screens/Dashboard';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Signup';
//import {AuthContext} from '../context/AuthContext';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import { AuthContext } from '../Context/AuthContext';

const Stack = createStackNavigator();

const getAsyncStorageData = async (key) => {
  return await AsyncStorage.getItem(key);
}

const Navigation = () => {
  const { userInfo, splashLoading } = useContext(AuthContext);
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {splashLoading ? (
          <Stack.Screen
            name="Splash Screen"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : userInfo.email ? (
          <Stack.Screen name="DashboardAuth" component={Dashboard} />
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={RegisterScreen}
              options={{headerShown: false}}
                              />
            <Stack.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
                />
                 <Stack.Screen
              name="Home"
              component={Home}
              options={{headerShown: false}}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;