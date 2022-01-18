import React from 'react'
import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { COLORS, FONTS } from '../constants'

interface TextButtonInterface { 
  label: string, 
  label2?: string,
  labelStyle?: StyleProp<TextStyle>,
  label2Style?: StyleProp<TextStyle>,
  disabled?: boolean,
  buttonContainerStyle: StyleProp<ViewStyle>, 
  onPress: () => void  
}

const TextButton = ({ label, label2 = "", labelStyle, label2Style, disabled, buttonContainerStyle, onPress }: TextButtonInterface) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary
      }, buttonContainerStyle]}
      onPress={onPress}
    >
      <Text style={[{ color: COLORS.white, ...FONTS.h3 }, labelStyle]}>{label}</Text>
      {label2 !== "" && 
        <Text
          style={[{
            flex: 1,
            color: COLORS.white,
            textAlign: 'center',
            ...FONTS.h3
          }, label2Style]}
        >
          {label2}
        </Text>
      }
    </TouchableOpacity>
  )
}

export default TextButton
