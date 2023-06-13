import React, { useContext, useEffect, useState } from 'react';
import { View, RefreshControl, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import {Box, Flex, Heading, ScrollView, Text, Icon, VStack, HStack, Menu, Pressable, Spinner} from "native-base";
import HeaderLayout from '../components/HeaderLayout';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

import apis from '../repositories/api';
import Loader from '../components/Loader';
import { AuthContext } from '../Context/AuthContext';

function MenuList({ navigation, id, onDelete }) {

  if (id === 'undefined') {
    return;
  }

  const showDeleteAlert = () => {
    Alert.alert('', 'Are you sure want to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>  onDelete(id)},
    ]);
  }
  
  // const navigation = useNavigation();
  return (
  <Menu w="190" placement='left top' trigger={triggerProps => {
    return <Pressable accessibilityLabel="More options menu" {...triggerProps}>
            <Icon as={MaterialIcons} name="more-vert" size="md" />
          </Pressable>;
     }}>
      <Menu.Item
        onPress={() =>
          navigation.navigate('EditEvent', {
            screen: 'AddEvent',
             id: id ,
          })}>Edit</Menu.Item>
        
      <Menu.Item onPress={() =>  showDeleteAlert(id) }>Delete</Menu.Item>
   </Menu>
  )
}

function FlatList({ navigation, event, onDelete }) {
  
  return (
      <View  key={event.id}>
          <Flex direction="column" mb="1" mt="1">
          <Box p="4" m="1" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "#f5f7fb"
            }} _web={{
              shadow: 2,
              borderWidth: 0
            }} _light={{
              backgroundColor: "gray.50"
          }}>
           <HStack  justifyContent="space-between" alignItems="center" w="100%" >
              <HStack justifyContent="center">
              <Text fontSize="15" fontWeight="bold" color="#0d6efd"
                style={{ paddingLeft: 50 }}>{event?.eventTitle.substring(0, 30)}</Text>
                </HStack>
            <HStack>
              <MenuList navigation={navigation} id={event.id} onDelete={onDelete} />
            </HStack>
          </HStack>
          <VStack mt="2">
          <Text>
            <Icon as={MaterialCommunityIcons} name="google-maps" color="#000000" size="md" />
              <Text style={{fontWeight: '200'}}> {event?.eventVenue?.name}</Text>
          </Text>
          </VStack>
          <VStack mt="2">
            <Text>
            <Icon as={MaterialCommunityIcons} name="clock-outline" color="emerald.500" size="md" />
              <Text  color="emerald.500"> {event?.eventDate}</Text>
          </Text>
          </VStack>
          <VStack mt="3">
               <Text fontWeight="400">
               {event.eventDesc}
            </Text>
            </VStack>
            </Box> 
          </Flex>
    </View>
  )
}

function Dashboard({navigation}) {
  const [refreshing, setRefreshing] = useState(false);
  const { userInfo, splashLoading, token } = useContext(AuthContext);
  console.log('Inside Dashboard');
  console.log(token);

  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);
  const [pageTitle, setPageTitle] = useState('Events Around You');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const deleteEventHandler = async (eventId) => {
    try {
          const newEvents = events.filter(
            (event) => event.id !== eventId
          );
          setEvents([...newEvents]);

      await apis.deleteEvent(eventId);
    } catch (err) {
          let errMsg = defaultErrorMessage;
          if (err.response.data.message) {
            errMsg = err.response.data.message;
          }
          setError(errMsg);
        }
  };


  const fetchEvents = async () => {
    console.log('fetchEvents..')
    setIsLoading(true); // Hide the Loader
    setNoEvents(false);
    try {
      let response;
      console.log('response..')
      response = await apis.getEvents();
      console.log(response)

      if (response.data.events.length === 0) {
        setNoEvents(true);
        setError('');
      }
      setEvents(response.data.events);
    } catch (err) {
      console.log('Fetch event error.....');
      let errMsg = 'Something unexpected happened';
      console.log(err.response.data.message);
      console.log(err);
      setError(errMsg);
    } finally {
      setIsLoading(false); // Hide the Loader
    }
  };

  const onRefresh = React.useCallback(() => {

    fetchEvents();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, []);


  return (
  <>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts"/>
            <Heading fontSize="md"> Loading</Heading>
        </HStack>
        </View>
    )  : (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Box flex="1" safeAreaTop>
            <Heading size="md" style={{ textAlign: 'center' }}>{ pageTitle}</Heading>
          <ScrollView refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
         }>
            {events.length > 0 &&
              events.map((event) => (
                <FlatList navigation={navigation} event={event} key={event.id} onDelete={deleteEventHandler} />
              ))}
          </ScrollView>
        </Box>
      
      </View>
      )}
      </>
  );
}

export default ({ navigation }) => {
    return (
      <>
        <HeaderLayout navigation={navigation} pageTitle='Dashboard' />
        <Dashboard navigation={navigation} />
      </>
    );
  };
