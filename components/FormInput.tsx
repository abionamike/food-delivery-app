import React from 'react'
import { View, Text, TextInput, StyleProp, ViewStyle, TextStyle, TextInputProps, KeyboardTypeOptions } from 'react-native'
import { FONTS, SIZES, COLORS } from '../constants'

interface FormInputInteface { 
  containerStyle: StyleProp<ViewStyle>, 
  label: string, 
  inputStyle: StyleProp<TextStyle>, 
  placeholder: string,
  prependComponent: JSX.Element, 
  appendComponent: JSX.Element, 
  onChange: (arg0: string) => void, 
  secureTextEntry: boolean,  
  keyboardType: KeyboardTypeOptions | undefined,
  autoComplete: | 'birthdate-day'
  | 'birthdate-full'
  | 'birthdate-month'
  | 'birthdate-year'
  | 'cc-csc'
  | 'cc-exp'
  | 'cc-exp-day'
  | 'cc-exp-month'
  | 'cc-exp-year'
  | 'cc-number'
  | 'email'
  | 'gender'
  | 'name'
  | 'name-family'
  | 'name-given'
  | 'name-middle'
  | 'name-middle-initial'
  | 'name-prefix'
  | 'name-suffix'
  | 'password'
  | 'password-new'
  | 'postal-address'
  | 'postal-address-country'
  | 'postal-address-extended'
  | 'postal-address-extended-postal-code'
  | 'postal-address-locality'
  | 'postal-address-region'
  | 'postal-code'
  | 'street-address'
  | 'sms-otp'
  | 'tel'
  | 'tel-country-code'
  | 'tel-national'
  | 'tel-device'
  | 'username'
  | 'username-new'
  | 'off'
  | undefined,
  autoCapitalize: "none" | "sentences" | "words" | "characters" | undefined,
  errorMsg: string
}

const FormInput = ({ 
  containerStyle, 
  label, 
  inputStyle, 
  placeholder,
  prependComponent, 
  appendComponent, 
  onChange, 
  secureTextEntry,  
  keyboardType="default",
  autoComplete="off",
  autoCapitalize="none",
  errorMsg=""
}: FormInputInteface) => {
  return (
    <View
      style={[containerStyle]}
    >
      {/* Label & Error Message */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body4
          }}
        >
          {label}
        </Text>

        <Text
          style={{
            color: COLORS.red,
            ...FONTS.body4
          }}
        >
          {errorMsg}
        </Text>
      </View>

      {/* Text Input */}
      <View
        style={{
          flexDirection: 'row',
          height: 55,
          paddingHorizontal: SIZES.padding,
          marginTop: SIZES.base,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2
        }}
      >
        {prependComponent}

        <TextInput 
          style={[{
            flex: 1,
          }, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          onChangeText={(text) => onChange(text)}
        />

        {appendComponent}
      </View>
    </View>
  )
}

export default FormInput
