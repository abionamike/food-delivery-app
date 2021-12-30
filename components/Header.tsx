import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { FONTS } from '../constants'

interface HeaderProp { 
  containerStyle: StyleProp<ViewStyle>, 
  title: string,
  leftComponent: JSX.Element,
  rightComponent: JSX.Element
}

const Header = ({ containerStyle, title, leftComponent, rightComponent }: HeaderProp) => {
  return (
    <View
      style={[containerStyle, { flexDirection: 'row' }]}
    >
      {/* Left */}
      {leftComponent}

      {/* Title */}
      <View 
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Text style={{ ...FONTS.h3 }}>{title}</Text>
      </View>

      {/* Right */}
      {rightComponent}
    </View>
  )
}

export default Header
