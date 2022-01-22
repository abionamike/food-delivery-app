import React, { useEffect } from 'react';
import {
    View,
    Text,
    BackHandler,
    Image
} from 'react-native';

const Success = () => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => { return true })
    
        return () => backHandler.remove();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text>Success</Text>
        </View>
    )
}

export default Success;