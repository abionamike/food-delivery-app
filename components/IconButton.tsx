import React from 'react'
import { View, Text, Image, ImageSourcePropType, StyleProp, ImageStyle, ViewStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, constants } from '../constants'

interface IconButtonInterface { 
  containerStyle: StyleProp<ViewStyle>, 
  iconStyle: StyleProp<ImageStyle>, 
  icon: ImageSourcePropType, 
  onPress: () => void 
}

const IconButton = ({ containerStyle, iconStyle, icon, onPress }: IconButtonInterface) => {
  return (
    <TouchableOpacity
      style={[containerStyle]}
      onPress={onPress}
    >
      <Image source={icon} style={[{ height: 30, width: 30, tintColor: COLORS.white }, iconStyle]} />
    </TouchableOpacity>
  )
}

export default IconButton
