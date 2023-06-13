import * as React from 'react';
import { View, Text, Button } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Dashboard from './Dashboard';


//import Login from './Login';

function Feed({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function Notifications() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications Screen</Text>
    </View>
  );
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator
      useLegacyImplementation
    >
          <Drawer.Screen name="Feed" component={Feed} />
          <Drawer.Screen name="Notifications" component={Notifications} />
          <Drawer.Screen name="Dashboard" component={Dashboard} />
          {/* <Drawer.Screen name="Login" component={Login} /> */}
    </Drawer.Navigator>
  );
}

export default function Home() {
  return (
    // <NavigationContainer>
      <MyDrawer />
    // </NavigationContainer>
  );
}