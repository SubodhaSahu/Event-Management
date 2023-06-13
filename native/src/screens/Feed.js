import * as React from 'react';
import { View, Text, NativeBaseProvider } from 'react-native';
import HeaderLayout from '../components/HeaderLayout';

function Content() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Feed Screen</Text>
        </View>
    );
}

export default ({ navigation }) => {
    return (
        <>
            <HeaderLayout navigation={navigation} pageTitle='Feed' /> 
            <Content />
        </>
    );
  };