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
import { CustomSwitch, FormInput, TextButton, TextIconButton } from '../../components';
import { COLORS, FONTS, icons, SIZES } from '../../constants';
import { utils } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const SignIn = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailErr, setEmailErr] = useState('');
    
    const [showPass, setShowPass] = useState(false);
    const [saveMe, setSaveMe] = useState(false);

    const isEnableSignIn = () => {
        return email !== '' && password !== '' && emailErr === ''
    }

    return (
        <AuthLayout 
            title="Let's Sign You In" 
            subTitle="Welcome back, you have been missed"
        >
            <>
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding * 2,
                    }}
                >
                    {/* Form input section */}
                    <FormInput 
                        label='Email'
                        keyboardType='email-address'
                        autoComplete='email'
                        value={email}
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

                    <FormInput 
                        label='Password'
                        secureTextEntry={!showPass}
                        autoComplete='password'
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        appendComponent={<TouchableOpacity
                            style={{
                                width: 40,
                                alignItems: 'flex-end',
                                justifyContent: 'center'
                            }}
                            onPress={() => setShowPass(!showPass)}
                        >
                            <Image
                                source={showPass ? icons.eye_close : icons.eye}
                                style={{
                                    width: 20,
                                    height: 20,
                                    tintColor: COLORS.gray
                                }} />
                        </TouchableOpacity>} inputStyle={undefined} placeholder={''} 
                        prependComponent={<></>} 
                        keyboardType={undefined} 
                        autoCapitalize={undefined} 
                        errorMsg={''}                
                    />

                    {/* Save me & forgot password section */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            justifyContent: 'space-between'
                        }}
                    >
                        <CustomSwitch 
                            value={saveMe}
                            onChange={(value: boolean) => setSaveMe(value)}
                        />

                        <TextButton 
                            label='Forgot Password'
                            buttonContainerStyle={{
                                backgroundColor: 'transpareny'
                            }}
                            labelStyle={{
                                color: COLORS.gray,
                                ...FONTS.body4,
                            }}
                            onPress={() => navigation.navigate('ForgotPassword')}
                        />
                    </View>

                    {/* Sign In */}
                    <TextButton 
                        label='Sign In'
                        disabled={isEnableSignIn() ? false : true}
                        buttonContainerStyle={{
                            height: 55,
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.transparentPrimray
                        }}
                        onPress={() => navigation.navigate('Home')}
                    />

                    {/* Sign Up */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SIZES.radius,
                            justifyContent: 'center'
                        }}
                    >
                        <Text
                            style={{
                                color: COLORS.darkGray,
                                ...FONTS.body3
                            }}
                        >
                            Don't have an account?
                        </Text>

                        <TextButton 
                            label='Sign Up'
                            buttonContainerStyle={{
                                marginLeft: 3,
                                backgroundColor: 'transparent'
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.h3
                            }}
                            onPress={() => navigation.navigate('SignUp')}
                        />
                    </View>
                </View>

                {/* Footer */}
                <View>
                    {/* Facebook login button */}
                    <TextIconButton 
                        containerStyle={{
                            height: 50,
                            alignItems: 'center',
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.blue,
                        }}
                        icon={icons.fb}
                        iconPosition='LEFT'
                        iconStyle={{
                            tintColor: COLORS.white
                        }}
                        label="Continue with Facebook"
                        labelStyle={{
                            marginLeft: SIZES.radius,
                            color: COLORS.white
                        }}
                        onPress={() => console.log('Facebook')}
                    />

                    {/* Google login button */}
                    <TextIconButton 
                        containerStyle={{
                            height: 50,
                            alignItems: 'center',
                            marginTop: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray2
                        }}
                        icon={icons.google}
                        iconPosition='LEFT'
                        iconStyle={{
                            tintColor: '#000',
                        }}
                        label={'Continue with Google'}
                        labelStyle={{
                            marginLeft: SIZES.radius
                        }}
                        onPress={() => console.log('Google')}
                    />
                </View>
            </>
        </AuthLayout>
    )
}

export default SignIn;