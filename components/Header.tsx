import React from 'react'
import { View, Text, StyleProp, ViewStyle, TextStyle } from 'react-native'
import { FONTS } from '../constants'

interface HeaderProp { 
  containerStyle: StyleProp<ViewStyle>, 
  title: string,
  titleStyle?: StyleProp<TextStyle>,
  leftComponent: JSX.Element,
  rightComponent: JSX.Element
}

const Header = ({ containerStyle, title, titleStyle, leftComponent, rightComponent }: HeaderProp) => {
  return (
    <View
      style={[{ height: 60, flexDirection: 'row' }, containerStyle]}
    >
      {/* Left */}
      {leftComponent}

      {/* Title */}
      <View 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={[{ ...FONTS.h3 }, titleStyle]}>{title}</Text>
      </View>

      {/* Right */}
      {rightComponent}
    </View>
  )
}

export default Header
