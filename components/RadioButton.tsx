import React from 'react'
import { View, Text, TouchableOpacity, Image, ViewStyle, StyleProp, TextStyle, ImageStyle } from 'react-native'
import { FONTS, COLORS, SIZES, icons } from '../constants'

interface Props { 
  containerStyle?: StyleProp<ViewStyle>, 
  label: string, 
  labelStyle?: StyleProp<TextStyle>, 
  onPress: () => void, 
  iconsStyle?: StyleProp<ImageStyle>, 
  isSelected: boolean 
}

const RadioButton = ({ containerStyle, label, labelStyle, onPress, iconsStyle, isSelected }: Props) => {
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }, containerStyle]}
      onPress={onPress}
    >
      <Image source={isSelected ? icons.check_on : icons.check_off} style={[{ marginLeft: 5, width: 20, height: 20 }, iconsStyle]} />
      <Text style={[{ marginLeft: SIZES.radius, color: COLORS.gray, ...FONTS.body3 }, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default RadioButton
