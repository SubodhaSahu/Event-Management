import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';



import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/Login';
import SignUp from './screens/Signup';

const Stack = createStackNavigator();

function App() {
  return (
    <>
     <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      {/* <StatusBar /> */}
    </Stack.Navigator>
    </>
  );
}

export default () => {
  return (
    <NavigationContainer>   
        <App />  
    </NavigationContainer>
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
