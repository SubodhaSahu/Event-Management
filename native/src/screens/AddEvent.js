import React, { useEffect, useState } from 'react';
import {ScrollView, RefreshControl, StyleSheet, View, TouchableOpacity} from "react-native";
import { Box, Flex, Text, Input, VStack, HStack, FormControl, TextArea, Select, Button } from "native-base";
import apis from '../repositories/api';

import HeaderLayout from '../components/HeaderLayout';
import ErrorAlert from '../components/ErrorAlert';
import { useNavigation } from "@react-navigation/native";
import Loader from '../components/Loader';

const AddForm = ({ id }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [formData, setData] = useState({});

  const [errors, setErrors] = useState({});
  const [venues, setVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState('')

  const [error, setError] = useState(null);

    const onRefresh = React.useCallback(() => {
        setData({});
        setErrors({});
        setRefreshing(true);
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);
  
  const validate = () => {
    setErrors({});
    if (formData.eventTitle === undefined) {
      setErrors({ ...errors, eventTitle: 'Name is required' });
      return false;
    } 
    if (formData.eventDesc === undefined) {
      setErrors({ ...errors, eventDesc: 'Description is required' });
      return false;
    } 
    if (formData.eventDate === undefined) {
      setErrors({ ...errors, eventDate: 'Date is required' });
      return false;
    } 
    if (formData.eventVenue === undefined) {
      setErrors({ ...errors, eventVenue: 'Venue is required' });
      return false;
    }
    return true;
  };

  const getEventDetails = async (eventId) => {
    try {
      const response = await apis.getEventById(eventId);
      setData({ ...response.data.events });
      setSelectedVenue(response.data.events.eventVenue._id)
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    // Get the data in order to populate while editing
    if (id > 0) {
      getEventDetails(id);
    }
  }, [id]);

  const onSubmit = async () => {
    setIsLoading(true);
   // if (validate()) {
      try {
        let response = '';
        formData.eventVenue = selectedVenue;

        // Call Put method for Update and Post for add
        if (id > 0) {
          delete formData['id'];
          response = await apis.putEvents(id, formData);
        } else {
          response = await apis.postEvents(formData);
        }
        //route.params.id = 0;
        setData({ ...{}});
        setErrors({ ...{}});
        navigation.navigate("Dashboard");
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false); // Hide the Loader
      }
  };

   // Get The Venue List to populate in the form dropdown
   useEffect(() => {
    (async () => {
      try {
        const response = await apis.getVenue();
        const { venues: venueList } = response.data;
        setVenues(venueList);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);
  
    return (
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <VStack width="90%" mx="3" maxW="300px">
            <FormControl isRequired isInvalid={'eventTitle' in errors}>
                <FormControl.Label _text={{
                bold: true
            }}>Title</FormControl.Label>
            <Input placeholder="Event Title" value={formData.eventTitle}  onChangeText={value => setData({ ...formData,
                eventTitle: value
            })} />
                {'eventTitle' in errors && <FormControl.ErrorMessage>{errors?.eventTitle}</FormControl.ErrorMessage> }
                </FormControl>
                <FormControl isRequired isInvalid={'eventDesc' in errors}>
                <FormControl.Label _text={{
                bold: true
            }}>Description</FormControl.Label>
               <TextArea h={20} placeholder="Event Description"  value={formData.eventDesc} onChangeText={value => setData({ ...formData,
                eventDesc: value
            })}/>
                {'eventDesc' in errors && <FormControl.ErrorMessage>{errors?.eventDesc}</FormControl.ErrorMessage> }
                </FormControl>
                <FormControl isRequired isInvalid={'eventDate' in errors}>
                <FormControl.Label _text={{
                bold: true
            }}>Date</FormControl.Label>
                <Input placeholder="Event Date" value={formData.eventDate} onChangeText={value => setData({ ...formData,
                eventDate: value
            })} />
                {'eventDate' in errors && <FormControl.ErrorMessage>{errors?.eventDate}</FormControl.ErrorMessage> }
                </FormControl>
                <FormControl>
            <FormControl.Label _text={{ bold: true }}> Venue</FormControl.Label>
            <Select  selectedValue={selectedVenue} minWidth="200" accessibilityLabel="Choose Event Venue" placeholder="Select Event Venue" _selectedItem={{
                bg: "teal.600",
            }} mt={1}
              onValueChange={itemValue => setSelectedVenue(itemValue)}>
              {venues.map((venue) => (
                   <Select.Item label= {venue.name}  value={venue._id} />
                ))}
                 </Select>
                    {'eventVenue' in errors && <FormControl.ErrorMessage>{errors?.venue}</FormControl.ErrorMessage>}
          </FormControl>
          
          <View>
            <TouchableOpacity mt="4" onPress={onSubmit} disabled={isLoading} style={styles.buttonDesign} >
              {isLoading ? <Loader /> : <Text style={styles.loginBtnText} > Submit</Text>}
          </TouchableOpacity>
            </View>
        </VStack>
      </ScrollView>

    )
}

const AddEvent = ({id}) => {
  //const { id = 0 } = useParams();
  const pageTitle = id > 0 ? 'Edit Event' : 'Add Event';

    return (
        <Flex direction="column" mb="1" mt="1">
          <Box p="4" m="1" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
            }} _web={{
              shadow: 2,
              borderWidth: 0
            }} _light={{
              backgroundColor: "gray.50"
          }}>
           
              <HStack justifyContent="center">
            <Text fontSize="15" fontWeight="bold">{ pageTitle}</Text>           
          </HStack>
          <AddForm id={id} key={id}/>
            </Box>
        </Flex>
    );
};

export default ({ route, navigation }) => {
  let id = 0;
  if (route.params !== undefined) {
    id = route.params.id;
  }
  console.log('Here...');
  console.log(id);

    return (
      <>
        <HeaderLayout navigation={ navigation} pageTitle='Add Event'/>
        <AddEvent id={id} />
      </>
    );
  };

//export default AddEvent;

const styles = StyleSheet.create({
  buttonDesign: {
    width: 300,
    backgroundColor: "#026efd",
    marginTop: 10,
    borderRadius: 50,
    padding: 10,
  },
  loginBtnText: {
    color: '#FFFFFF',
    textAlign: 'center', 
  }
});