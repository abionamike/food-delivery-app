import React from 'react'
import { View, Text, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { LineDivider, TextButton } from '.'
import { FONTS, SIZES, COLORS } from '../constants'

interface Props { 
  subTotal: number, 
  shippingFee: number, 
  total: number, 
  onPress: () => void 
}

const FooterTotal = ({ subTotal, shippingFee, total, onPress }: Props) => {
  return (
    <View>
      {/* Shadow */}
      <LinearGradient 
        start={{ x:0, y: 0 }}
        end={{ x: 0, y: 1 }}
        colors={[COLORS.transparent, COLORS.lightGray1]}
        style={{
          position: 'absolute',
          top: -15,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 200 : 50,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15
        }}
      />

      {/* Order Details */}
      <View
        style={{
          padding: SIZES.padding,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          backgroundColor: COLORS.white
        }}
      >
        {/* Subtotal */}
        <View
          style={{
            flexDirection: 'row',
          }}
        >
          <Text style={{ flex: 1, ...FONTS.body3 }}>Subtotal</Text>
          <Text style={{ ...FONTS.h3 }}>${subTotal.toFixed(2)}</Text>
        </View>

        {/* shipping fee */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.base,
            marginBottom: SIZES.padding
          }}
        >
          <Text style={{ flex: 1, ...FONTS.body3 }}>Shipping Fee</Text>
          <Text style={{ ...FONTS.h3 }}>${shippingFee.toFixed(2)}</Text>
        </View>

        {/* line divide */}
        <LineDivider />

        {/* total */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.padding
          }}
        >
          <Text style={{ flex: 1, ...FONTS.h2 }}>Total</Text>
          <Text style={{ ...FONTS.h2 }}>${total.toFixed(2)}</Text>
        </View>

        {/* Order button */}
        <TextButton 
          buttonContainerStyle={{
            height: 60,
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary
          }}
          label='Place Your Order'
          onPress={onPress}
        />
      </View>
    </View>
  )
}

export default FooterTotal
