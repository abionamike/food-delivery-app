import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
    View,
    Text,
    BackHandler,
    Image
} from 'react-native';
import { RootStackParamList } from '../../App';
import { TextButton } from '../../components';
import { FONTS, SIZES, COLORS, images } from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const Success = ({ navigation }: Props) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener("hardwareBackPress", () => { return true })
    
        return () => backHandler.remove();
    }, []);

    return (
        <View
            style={{
                flex: 1,
                paddingHorizontal: SIZES.padding,
                backgroundColor: COLORS.white
            }}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={images.success} resizeMode='contain' style={{ width: 150, height: 150 }} />
                <Text style={{ marginTop: SIZES.padding, ...FONTS.h1 }}>Congratulation!</Text>
                <Text style={{ textAlign: 'center', marginTop: SIZES.base, color: COLORS.darkGray, ...FONTS.body3 }}>Payment was successfully made!</Text>
            </View>

            <TextButton 
                label='Done'
                buttonContainerStyle={{
                    height: 55,
                    marginBottom: SIZES.padding,
                    borderRadius: SIZES.radius,
                    backgroundColor: COLORS.primary
                }}
                onPress={() => navigation.navigate("DeliveryStatus")}
            />
        </View>
    )
}

export default Success;