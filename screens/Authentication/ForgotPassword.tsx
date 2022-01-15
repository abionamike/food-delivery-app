import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image
} from 'react-native';

import { AuthLayout } from '..';
import { RootStackParamList } from '../../App';
import { FormInput, TextButton } from '../../components';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import { utils } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const ForgotPassword = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const isEnableSendEmail = () => {
        return email !== '' && emailErr === ''
    }

    return (
        <AuthLayout
            title='Password Recovery'
            subTitle='Please enter you email address to recover your password'
            titleContainerStyle={{
                marginTop: SIZES.padding * 2
            }}
        >
            <>
                {/* Form input section */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding * 2,
                    }}
                >
                    <FormInput 
                        label='Email'
                        keyboardType='email-address'
                        autoComplete='email'
                        onChange={(value) => {
                            // validate email
                            utils.validateEmail(value, setEmailErr)

                            setEmail(value);
                        }}
                        errorMsg={emailErr}
                        appendComponent={<View style={{ justifyContent: 'center' }}>
                            <Image 
                                source={email === '' || (email !== '' && emailErr === '') ? icons.correct : icons.cross} 
                                style={{ 
                                    height: 20, 
                                    width: 20, 
                                    tintColor: email === '' ? COLORS.gray : (email !== '' && emailErr === '') ? COLORS.green : COLORS.red
                                }} 
                            />
                        </View>} 
                        containerStyle={undefined} 
                        inputStyle={undefined} 
                        placeholder={''} 
                        prependComponent={<></>} 
                        secureTextEntry={false} 
                        autoCapitalize={undefined}                
                    />
                </View>


                {/* Button */}
                <TextButton 
                    label='Send Email'
                    disabled={isEnableSendEmail() ? false : true}
                    buttonContainerStyle={{
                        height: 55,
                        alignItems: 'center',
                        marginTop: SIZES.padding,
                        borderRadius: SIZES.radius,
                        backgroundColor: isEnableSendEmail() ? COLORS.primary : COLORS.transparentPrimray
                    }}
                    onPress={() => navigation.goBack()}
                />
            </>
        </AuthLayout>
    )
}

export default ForgotPassword;