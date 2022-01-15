import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text
} from 'react-native';
import { AuthLayout } from '..';
import { RootStackParamList } from '../../App';
import { TextButton } from '../../components';
import { FONTS, SIZES, COLORS } from '../../constants';
import OTPInputView from '@twotalltotems/react-native-otp-input';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const Otp = ({ navigation }: Props) => {
    const [timer, setTimer] = useState(60);

    useEffect(() => {
        let interval = setInterval(() => {
            setTimer((prev) =>  {
                if(prev > 0) {
                    return(prev - 1)
                } else {
                    return prev
                }
            });

            return () => clearInterval(interval)
        }, 1000);
    }, [])

    return (
        <AuthLayout
            title='OTP Authentication'
            subTitle='An authentication code has been sent to amabiona21@gmail.com'
            titleContainerStyle={{
                marginTop: SIZES.padding * 2
            }}
        >
            <>
                {/* OTP inputs */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding * 2
                    }}
                >
                    <OTPInputView 
                        pinCount={4}
                        style={{
                            width: '100%',
                            height: 50
                        }}
                        codeInputFieldStyle={{
                            width: 65,
                            height: 65,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2,
                            color: COLORS.black,
                            ...FONTS.h3
                        }}
                        onCodeFilled={(code) => {
                            console.log(code)
                        }}
                    />

                    {/* Countdown timer */}
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: 'center',
                            marginTop: SIZES.padding
                        }}
                    >
                        <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>Didn't receive code?</Text>
                        <TextButton 
                            label={`Resend (${timer}s)`}
                            disabled={timer === 0 ? false : true}
                            buttonContainerStyle={{
                                marginLeft: SIZES.base,
                                backgroundColor: 'transparent',
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.h3
                            }}
                            onPress={() => setTimer(60)}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View>
                    <TextButton 
                        label='Continue'
                        buttonContainerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.primary
                        }}
                        onPress={() => navigation.navigate("Home")}
                    />

                    <View
                        style={{
                            marginTop: SIZES.padding,
                            alignItems: 'center',
                        }}
                    >
                        <Text 
                            style={{
                                color: COLORS.darkBlue,
                                ...FONTS.body3
                            }}
                        >
                            By signing up, you agree to our
                        </Text>
                        <TextButton 
                            label='Terms & Conditions'
                            buttonContainerStyle={{
                                backgroundColor: 'transparent',
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.body3
                            }}
                            onPress={() => console.log('terms & condition')}
                        />
                    </View>
                </View>
            </>
        </AuthLayout>
    )
}

export default Otp;