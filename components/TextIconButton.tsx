import React from 'react'
import { TouchableOpacity, Text, Image, StyleProp, ViewStyle, TextStyle, ImageStyle, ImageSourcePropType, StyleSheet } from 'react-native'
import { COLORS, FONTS } from '../constants'

interface TextIconButtonInterface { 
  containerStyle: StyleProp<ViewStyle>, 
  label: number | string, 
  labelStyle: StyleProp<TextStyle>, 
  icon: ImageSourcePropType, 
  iconPosition?: "LEFT" | "RIGHT",
  iconStyle?: StyleProp<ImageStyle>, 
  onPress: () => void 
}

const TextIconButton = ({ containerStyle, label, labelStyle, icon, iconPosition, iconStyle, onPress }: TextIconButtonInterface) => {
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }, containerStyle]}
      onPress={onPress}
    >
      {iconPosition === "LEFT" &&
        <Image 
          source={icon}
          style={[styles.image, iconStyle]}
        />
      }

      <Text
        style={[{
          ...FONTS.body3
        }, labelStyle]}
      >
        {label}
      </Text>

      {!iconPosition &&
        <Image 
          source={icon}
          style={[styles.image, iconStyle]}
        />
      }

      {iconPosition === "RIGHT" &&
        <Image 
          source={icon}
          style={[styles.image, iconStyle]}
        />
      }
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  image: {
    marginLeft: 3,
    width: 20,
    height: 20,
    tintColor: COLORS.black
  }
})

export default TextIconButton
