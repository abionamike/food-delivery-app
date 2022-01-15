import React from 'react'
import { TouchableOpacity, Text, StyleProp, TextStyle, ViewStyle } from 'react-native'
import { COLORS, FONTS } from '../constants'

interface TextButtonInterface { 
  label: string, 
  labelStyle?: StyleProp<TextStyle>,
  disabled?: boolean,
  buttonContainerStyle: StyleProp<ViewStyle>, 
  onPress: () => void  
}

const TextButton = ({ label, labelStyle, disabled, buttonContainerStyle, onPress }: TextButtonInterface) => {
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
    </TouchableOpacity>
  )
}

export default TextButton
