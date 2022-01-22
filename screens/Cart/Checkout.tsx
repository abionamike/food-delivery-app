import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, Image} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../App';
import { Header, IconButton, FormInput, CardItem, FooterTotal } from '../../components';
import { FONTS, SIZES, icons, dummyData, COLORS } from '../../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

KeyboardAwareScrollView

const Checkout = ({ navigation, route }: Props) => {
  const { selectedCard: card } = route.params;

  const [selectedCard, setSelectedCard] = useState(card);
  const [couponValue, setCouponValue] = useState('')

  const renderHeader = () => {
    return (
      <Header 
        title='CHECKOUT'
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40
        }} 
        leftComponent={
          <IconButton 
            icon={icons.back}
            containerStyle={{
              width: 40,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderRadius: SIZES.radius,
              borderColor: COLORS.gray2
            }}
            iconStyle={{
              width: 20,
              height: 20,
              tintColor: COLORS.gray2
            }}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <View style={{ width: 40 }} />
        }            
      />
    )
  }

  const renderMyCards = () => {
    return (
      <View>
        {dummyData.myCards.map((item, index) => (
          <CardItem key={`MyCard-${item.id}`} item={item} isSelected={`${selectedCard?.key}-${selectedCard?.id}` === `MyCard-${item.id}`} onPress={() => setSelectedCard({ ...item, key: "MyCard" })} />
        ))}
      </View>
    )
  }

  const renderDeliveryAddress = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Delivery Address</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: SIZES.radius,
            paddingVertical: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderWidth: 2,
            borderRadius: SIZES.radius,
            borderColor: COLORS.lightGray2
          }}
        >
          <Image source={icons.location1} style={{ width: 40, height: 40 }} />
          <Text style={{ marginLeft: SIZES.radius, width: '85%', ...FONTS.body3 }}>300 Post Street San Francisco, CA</Text>
        </View>
      </View>
    )
  }

  const renderCoupon = () => {
    return (
      <View style={{ marginTop: SIZES.padding }}>
        <Text style={{ ...FONTS.h3 }}>Add Coupon</Text>  

        <FormInput 
          inputContainerStyle={{
            marginTop: 0,
            paddingLeft: SIZES.padding,
            paddingRight: 0,
            borderWidth: 2,
            borderColor: COLORS.lightGray2,
            backgroundColor: COLORS.white,
            overflow: "hidden"
          }}
          placeholder='Coupon code'
          appendComponent={<View style={{ width: 60, alignItems: 'center', backgroundColor: COLORS.primary, justifyContent: 'center' }}>
            <Image style={{ width: 40, height: 40 }} source={icons.discount} />
          </View>} 
          containerStyle={undefined} 
          label={''} 
          value={couponValue}
          inputStyle={undefined} 
          prependComponent={<></>} 
          onChange={(value) => setCouponValue(value)} 
          secureTextEntry={false} 
          autoComplete={undefined} 
          autoCapitalize={undefined} 
          errorMsg={''}        
        /> 
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      {<KeyboardAwareScrollView
        keyboardDismissMode='on-drag'
        extraScrollHeight={-200}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 20,
        }}
      >
        {/* Card */}
        {renderMyCards()}

        {/* Delivery Address */}
        {renderDeliveryAddress()}

        {/* Coupon section */}
        {renderCoupon()}
      </KeyboardAwareScrollView>}

      <FooterTotal 
        subTotal={37.97}
        shippingFee={0}
        total={37.97}
        onPress={() => navigation.replace("Success")}
      /> 
    </View>
  )
}

export default Checkout
