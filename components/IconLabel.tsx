import React from 'react'
import { View, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType } from 'react-native'
import { FONTS, SIZES } from '../constants'

interface Props { 
  containerStyle: StyleProp<ViewStyle>, 
  icon: ImageSourcePropType, 
  iconStyle?: StyleProp<ImageStyle>, 
  label: string, 
  labelStyle?: StyleProp<TextStyle> 
}

const IconLabel = ({ containerStyle, icon, iconStyle, label, labelStyle }: Props) => {
  return (
    <View style={[{ flexDirection: 'row', paddingVertical: SIZES.base, paddingHorizontal: SIZES.radius, borderRadius: SIZES.radius }, containerStyle]}>
      <Image style={[{ width: 20, height: 20 }, iconStyle]} source={icon} />
      <Text style={[ { marginLeft: SIZES.base, ...FONTS.body3 }, labelStyle ]}>{label}</Text>
    </View>
  )
}

export default IconLabel
