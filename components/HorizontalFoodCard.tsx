import React from 'react'
import { View, Text, Image, StyleProp, ViewStyle, ImageStyle } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { COLORS, FONTS, icons, SIZES } from '../constants'
import { MenuListInterface } from '../screens/Home/Home'

interface HorizontalFoodCardInterface {
  containerStyle: StyleProp<ViewStyle>, 
  imageStyle: StyleProp<ImageStyle>, 
  item: MenuListInterface,
  onPress: () => void
}

const HorizontalFoodCard = ({ containerStyle, imageStyle, item, onPress }: HorizontalFoodCardInterface) => {
  return (
    <TouchableOpacity
      style={[containerStyle, {
        flexDirection: 'row',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2,
      }]}
    >
      {/* Image */}
      <Image 
        source={item.image}
        style={imageStyle}
      />

      {/* Info */}
      <View
        style={{ flex: 1 }}
      >
        {/* Name */}
        <Text style={{ ...FONTS.h3, fontSize: 17 }}>{item.name}</Text>


        {/* Description */}
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>{item.description}</Text>

        {/* Price */}
        <Text style={{ marginTop: SIZES.base, ...FONTS.h2 }}>${item.price}</Text>
      </View>

      {/* Calories */}
      <View
        style={{ flexDirection: 'row', position: 'absolute', top: 5, right: SIZES.radius }}
      >
        <Image style={{ width: 30, height: 30 }} source={icons.calories} />

        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{item.calories} Calories</Text>
      </View>
    </TouchableOpacity>
  )
}

export default HorizontalFoodCard
