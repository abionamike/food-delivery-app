import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import {
    View,
    Text
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { RootStackParamList } from '../App';
import { COLORS } from '../constants';

type Main = NativeStackScreenProps<RootStackParamList, 'Home'>;

type ProfileScreenNavigationProp = Main['navigation'];

interface Props {
    route: RouteProp<Record<string, object | undefined>, "MainLayout">;
    navigation: ProfileScreenNavigationProp;
    drawerAnimationStyle: {
        borderRadius: Animated.Node<number>;
        transform: {
            scale: Animated.Node<number>;
        }[];
    }
}

const MainLayout = ({ drawerAnimationStyle }: Props) => {
    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle
            }}
        >
            {/* <TouchableOpacity onPress={() => n}></TouchableOpacity> */}
            <Text>MainLayout</Text>
        </Animated.View>
    )
}

export default MainLayout;