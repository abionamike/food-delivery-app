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
import { FormInput, TextButton, TextIconButton } from '../../components';
import { FONTS, SIZES, COLORS, icons } from '../../constants';
import { utils } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUp'>;

const SignUp = ({ navigation }: Props) => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);

    const [emailErr, setEmailErr] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    
    const isEnableSignUp = () => {
        return email !== '' && username !== '' && password !== '' && emailErr === '' && passwordErr === '' && usernameErr === ''
    }
    
    return (
        <AuthLayout
            title="Getting Started"
            subTitle='Create an account to continue!'
            titleContainerStyle={{
                marginTop: SIZES.radius
            }}
        >
            <>
                {/* Form Input & Sign Up Section */}
                <View
                    style={{
                        flex: 1,
                        marginTop: SIZES.padding,
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

                    <FormInput 
                        label='Username'
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        onChange={(value) => setUsername(value)}
                        errorMsg={usernameErr}
                        appendComponent={<View
                            style={{
                                justifyContent: 'center'
                            }}
                        >
                            <Image
                                source={username === '' || (username !== '' && usernameErr === '') ? icons.correct : icons.cross}
                                style={{
                                    height: 20,
                                    width: 20,
                                    tintColor: username === "" ? COLORS.gray : (username !== '' && usernameErr === '') ? COLORS.green : COLORS.red
                                }} />
                        </View>} 
                        inputStyle={undefined} 
                        placeholder={''} 
                        prependComponent={<></>} 
                        secureTextEntry={false} 
                        keyboardType={undefined} 
                        autoComplete={undefined} 
                        autoCapitalize={undefined}                
                    />

                    <FormInput 
                        label='Password'
                        secureTextEntry={!showPass}
                        autoComplete='password'
                        containerStyle={{
                            marginTop: SIZES.radius
                        }}
                        onChange={(value) => {
                            utils.validatePassword(value, setPasswordErr);
                            
                            setPassword(value);
                        }}
                        appendComponent={
                            <TouchableOpacity
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
                            </TouchableOpacity>
                        } 
                        inputStyle={undefined} 
                        placeholder={''} 
                        prependComponent={<></>} 
                        keyboardType={undefined} 
                        autoCapitalize={undefined} 
                        errorMsg={passwordErr}                
                    />

                    <TextButton 
                        label='Sign Up'
                        disabled={isEnableSignUp() ? false : true}
                        buttonContainerStyle={{
                            height: 55,
                            alignItems: 'center',
                            marginTop: SIZES.padding,
                            borderRadius: SIZES.radius,
                            backgroundColor: isEnableSignUp() ? COLORS.primary : COLORS.transparentPrimray
                        }}
                        onPress={() => navigation.navigate("Otp")}
                    />

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
                            Already have an account?
                        </Text>

                        <TextButton 
                            label='Sign In'
                            buttonContainerStyle={{
                                marginLeft: 3,
                                backgroundColor: 'transparent'
                            }}
                            labelStyle={{
                                color: COLORS.primary,
                                ...FONTS.h3
                            }}
                            onPress={() => navigation.goBack()}
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

export default SignUp;