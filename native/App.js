import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import { StyleSheet } from 'react-native';
import AuthStack from './src/Navigation/AuthStack';
import AppStack from './src/Navigation/AppStack';
import { NativeBaseProvider } from 'native-base';
import { AuthProvider } from './src/Context/AuthContext';
import Navigation from './src/Navigation/Navigation';
import { LogBox } from "react-native";

function App() {
  LogBox.ignoreLogs(["EventEmitter.removeListener"]);
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <AuthProvider>
         <Navigation />
      </AuthProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default () => {
  return (
    <>
      <App />  
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dummyText: {
    margin: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: 'blue',
  }
});
