import React from 'react';
import { Spinner, Heading, HStack} from "native-base";

const Loader = () => {
    return (
        <HStack space={2} justifyContent="center">
            <Spinner accessibilityLabel="Loading posts" color="#FFFFFF" />
            <Heading color="#FFFFFF" fontSize="md"> Loading</Heading>
        </HStack>
    )
};

export default Loader;