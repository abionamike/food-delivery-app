import React from 'react'
import { View, Image, StyleSheet, StyleProp, ImageStyle } from 'react-native'
import { COLORS , icons} from '../constants'

interface Props { 
  rating: number, 
  iconStyle: StyleProp<ImageStyle>, 
  activeColor?: string, 
  inActiveColor?: string
}

const Rating = ({ 
  rating, 
  iconStyle, 
  activeColor = COLORS.orange, 
  inActiveColor  = COLORS.lightOrange3
}: Props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Image source={icons.star} style={[{ tintColor: rating >= 1 ? activeColor : inActiveColor }, styles.icon, iconStyle]} />
      <Image source={icons.star} style={[{ tintColor: rating >= 2 ? activeColor : inActiveColor }, styles.icon, iconStyle]} />
      <Image source={icons.star} style={[{ tintColor: rating >= 3 ? activeColor : inActiveColor }, styles.icon, iconStyle]} />
      <Image source={icons.star} style={[{ tintColor: rating >= 4 ? activeColor : inActiveColor }, styles.icon, iconStyle]} />
      <Image source={icons.star} style={[{ tintColor: rating >= 5 ? activeColor : inActiveColor }, styles.icon, iconStyle]} />
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    height: 15,
    width: 15
  }
})

export default Rating
