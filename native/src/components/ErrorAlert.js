import React, { useEffect, useState } from 'react';
import {
    Text
} from "react-native";
import {  Alert, HStack, VStack, IconButton, CloseIcon } from "native-base";

const ErrorAlert = ({ errorMsg, setShowError, showErr }) => {
    return (
        <>
                <Alert status="error" w="80%">
                    <VStack space={1} flexShrink={1} w="100%">
                        <HStack flexShrink={1} space={2} alignItems="center" justifyContent="space-between">
                            <HStack flexShrink={1} space={2} alignItems="center">
                                <Alert.Icon />
                                <Text _dark={{
                                    color: "coolGray.800"
                                }}>
                                    {errorMsg}
                                </Text>
                            </HStack>
                            <IconButton variant="unstyled" _focus={{
                                borderWidth: 0
                            }} icon={<CloseIcon size="3" />} _icon={{
                                color: "coolGray.600"
                            }} onPress={() => setShowError(false)} />
                        </HStack>
                    </VStack>
                </Alert>
        </>
    );
};

export default ErrorAlert;