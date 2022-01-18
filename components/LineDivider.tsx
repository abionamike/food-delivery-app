import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import { COLORS } from '../constants'

const LineDivider = ({ lineStyle }: { lineStyle?: StyleProp<ViewStyle> }) => {
  return (
    <View
      style={[
        {
          height: 2,
          width: '100%',
          backgroundColor: COLORS.lightGray2,
        },
        lineStyle
      ]}
    />
  )
}

export default LineDivider
