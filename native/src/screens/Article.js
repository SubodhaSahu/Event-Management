import * as React from 'react';
import { View, Text } from 'react-native';
import HeaderLayout from '../components/HeaderLayout';

function Article({ navigation}) {
    return (
        <>
        <HeaderLayout navigation={ navigation} pageTitle='Article'/> 
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Article Screen</Text>
            </View>
            </>
    );
}

export default Article;