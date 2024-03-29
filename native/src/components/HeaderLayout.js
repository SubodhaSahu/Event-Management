import React from 'react';
import { Box, HStack, IconButton, StatusBar, Text, Icon } from 'native-base';
import { MaterialIcons } from "@expo/vector-icons";


const HeaderLayout = ({ navigation, pageTitle}) => {
    return (
        <>
            <StatusBar bg="#3700B3" barStyle="light-content" />
            <Box safeAreaTop bg="violet.600" />
            <HStack bg="violet.800" px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
                <HStack justifyContent="center">
                    <IconButton icon={<Icon size="sm" as={MaterialIcons} name="menu" color="white" />} onPress={() => navigation.openDrawer()} />
                </HStack>
                <HStack justifyContent="center">
                    <Text color="white" fontSize="20" fontWeight="bold">{pageTitle}</Text>
                </HStack>
                <HStack>
                    {/* <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} /> */}
                    <IconButton icon={<Icon as={MaterialIcons} name="more-vert" size="sm" color="white" />} />
                </HStack>
            </HStack>       
        </>
    );
};

export default HeaderLayout;