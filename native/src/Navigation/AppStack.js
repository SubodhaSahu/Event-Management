import * as React from 'react';
import { View, TouchableOpacity} from 'react-native';
import { Text, Icon, HStack, Image, Button } from 'native-base';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

//example Pages
import Feed from '../screens/Feed';
import Article from '../screens/Article';
import Dashboard from '../screens/Dashboard';
import AddEvent from '../screens/AddEvent';

import { MaterialIcons } from "@expo/vector-icons";

import { AuthContext } from '../Context/AuthContext';
import { log } from 'react-native-reanimated';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { logout } = React.useContext(AuthContext);

  return (
    <View  style={{flex: 1}}>
      <DrawerContentScrollView {...props}
        >
        <HStack justifyContent="center" space={2}>
        <Image source={{
        uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
      }} alt='user image '   style={{height: 100, width: 100, borderRadius: 50, marginBottom: 5, marginTop:5  }}/>

        </HStack>
         <View style={{flex: 1, backgroundColor: '#fff', paddingTop: 10}}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: '#ccc' }}> 
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Button variant="unstyled" onPress={logout} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Icon size="sm" as={MaterialIcons} name="logout" color="black" />
                <Text> Logout </Text>
              </View>
            </Button>
          </View>
      </View>
    </View>
  );
}

export default function AppStack() {
  return (
    <Drawer.Navigator
          useLegacyImplementation
          screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: '#5b21b6',
            drawerActiveTintColor: '#fff',
            drawerInactiveTintColor: '#333',
            drawerLabelStyle: {
              marginLeft: -25,
              fontSize: 15,
            },
          }}
          drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      
      <Drawer.Screen name="Dashboard" component={Dashboard}  options={{
          drawerIcon: ({ color }) => (
            <Icon size="sm" as={MaterialIcons} name="home" color={color} />
          ),
      }} />
      <Drawer.Screen name="AddEvent" component={AddEvent}  options={{
          drawerIcon: ({ color }) => (
            <Icon size="sm" as={MaterialIcons} name="add-circle-outline" color={color} />
          ),
      }} />
    
  
          <Drawer.Screen name="Feed" component={Feed} options={{
          drawerIcon: ({ color }) => (
            <Icon size="sm" as={MaterialIcons} name="home" color={color} />
          ),
        }}/>
          <Drawer.Screen name="Article" component={Article} options={{
          drawerIcon: ({ color }) => (
            <Icon size="sm" as={MaterialIcons} name="home" color={color} />
          ),
      }} />
        <Drawer.Screen name="EditEvent" component={AddEvent}  options={{
    drawerItemStyle: { height: 0 }
  }} />
          
    </Drawer.Navigator>
  );
}