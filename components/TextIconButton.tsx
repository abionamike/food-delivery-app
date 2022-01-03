import React from 'react'
import { TouchableOpacity, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native'
import { COLORS, FONTS } from '../constants'

interface TextIconButtonInterface { 
  containerStyle: StyleProp<ViewStyle>, 
  label: number, 
  labelStyle: StyleProp<TextStyle>, 
  icon: ImageSourcePropType, 
  iconStyle: StyleProp<ImageStyle>, 
  onPress: () => void 
}

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconStyle, onPress }: TextIconButtonInterface) => {
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }, containerStyle]}
      onPress={onPress}
    >
      <Text
        style={[{
          ...FONTS.body3
        }, labelStyle]}
      >
        {label}
      </Text>
      <Image 
        source={icon}
        style={[{
          marginLeft: 5,
          width: 20,
          height: 20,
          tintColor: COLORS.black
        }, iconStyle]}
      />
    </TouchableOpacity>
  )
}

export default TextIconButton
