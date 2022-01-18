import React from 'react'
import { View, Text, StyleProp, ViewStyle } from 'react-native'
import { IconButton } from '.'
import { COLORS, FONTS, icons, SIZES } from '../constants'

interface Props { 
  containerStyle?: StyleProp<ViewStyle>, 
  value: number, 
  onAdd: () => void, 
  onMins: () => void 
}

const StepperInput = ({ containerStyle, value, onAdd, onMins }: Props) => {
  return (
    <View
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: 130,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius
      }, containerStyle]}
    >
      <IconButton 
        containerStyle={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        icon={icons.minus} 
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: value > 1 ? COLORS.primary : COLORS.gray
        }} 
        onPress={onMins}      
      />
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={{ ...FONTS.h2 }}>{value}</Text>
        </View>
      <IconButton 
        containerStyle={{
          width: 50,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        icon={icons.plus}
        iconStyle={{
          height: 25,
          width: 25,
          tintColor: COLORS.primary
        }}
        onPress={onAdd}
      />
    </View>
  )
}

export default StepperInput
