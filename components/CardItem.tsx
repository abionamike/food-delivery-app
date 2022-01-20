import React from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import { FONTS, SIZES, COLORS, icons } from '../constants'

interface Props { 
  item: {
    id: number;
    name: string;
    icon: ImageSourcePropType;
    card_no?: string;
  }, 
  isSelected: boolean, 
  onPress: () => void 
}

const CardItem = ({ item, isSelected, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 100,
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderWidth: 2,
        borderRadius: SIZES.radius,
        borderColor: isSelected ? COLORS.primary : COLORS.lightGray2
      }}
      onPress={onPress}
    >
      {/* Card Image */}
      <View
        style={{
          width: 60,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 2,
          borderRadius: SIZES.radius,
          borderColor: COLORS.lightGray2
        }}
      >
        <Image source={item.icon} style={{ width: 35, height: 35 }} resizeMode='center' />
      </View>

      {/* Name */}
      <Text style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.h3 }}>{item.name}</Text>
      
      {/* Radios Button */}
      <Image source={isSelected ? icons.check_on : icons.check_off} style={{ width: 25, height: 25 }} />
    </TouchableOpacity>
  )
}

export default CardItem
