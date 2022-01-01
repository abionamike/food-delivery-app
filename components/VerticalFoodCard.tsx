import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleProp, ViewStyle } from 'react-native'
import { COLORS, FONTS, SIZES, icons } from '../constants'
import { MenuListInterface } from '../screens/Home/Home'

interface VerticalFoodCardInterface { 
  containerStyle: StyleProp<ViewStyle>, 
  item: MenuListInterface, 
  onPress : () => void,
}

const VerticalFoodCard = ({ containerStyle, item, onPress }: VerticalFoodCardInterface) => {
  return (
    <TouchableOpacity
      style={[containerStyle, {
        width: 200,
        padding: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGray2
      }]}
    >
      {/* Caloreis & favourite */}
      <View style={{ flexDirection: 'row' }}>
        {/* Calories */}
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image 
            source={icons.calories}
            style={{ width: 30, height: 30 }}
          />
          <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{item.calories} Calories</Text>
        </View>

        {/* Favourite */}
        <Image 
          source={icons.love}
          style={{ width: 20, height: 20, tintColor: item.isFavourite ? COLORS.primary : COLORS.gray }}
        />
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Image 
          source={item.image}
          style={{ height: '100%', width: '100%' }}
        />
      </View>

      {/* Info */}
      <View
        style={{
          alignItems: 'center',
          marginTop: -20
        }}
      >
        <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
        <Text style={{ color: COLORS.darkGray2, ...FONTS.body5, textAlign: 'center' }}>{item.description}</Text>
        <Text style={{ marginTop: SIZES.radius, ...FONTS.h2 }}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  )
}

export default VerticalFoodCard
