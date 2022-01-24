import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { RootStackParamList } from '../../App';
import { Header, LineDivider, TextButton, TextIconButton } from '../../components'
import { FONTS, COLORS, SIZES, icons, constants } from '../../constants'

type Props = NativeStackScreenProps<RootStackParamList, 'DeliveryStatus'>;

const DeliveryStatus = ({ navigation }: Props) => {
  const [currentStep, setCurrentStep] = useState(3);

  const renderHeader = () => {
    return (
      <Header 
        title='DELIVERY STATUS'
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40
        }} 
        leftComponent={<></>}
        rightComponent={<></>}            
      />
    )
  }

  const renderInfo = () => {
    return (
      <View style={{ marginTop: SIZES.radius, paddingHorizontal: SIZES.padding }}>
        <Text style={{ textAlign: 'center', color: COLORS.gray, ...FONTS.body4 }}>Estimated Delivery</Text>
        <Text style={{ textAlign: 'center', ...FONTS.h2 }}>21 Sept 2021 / 12:30PM</Text>
      </View>
    )
  }

  const renderTrackOrder = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding,
          paddingVertical: SIZES.padding,
          borderRadius: SIZES.radius,
          borderWidth: 2,
          borderColor: COLORS.lightGray2,
          backgroundColor: COLORS.white2
        }}
      >
        {/* Track Order */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 20,
            paddingHorizontal: SIZES.padding
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Track Order</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body3 }}>NY012345</Text>
        </View>

        <LineDivider lineStyle={{ backgroundColor: COLORS.lightGray2 }} />

        {/* Status */}
        <View
          style={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
        >
          {constants.track_order_status.map((item, index) => {
            return (
              <View key={`Status-list-${index}`}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: -5 }}>
                  <Image source={icons.check_circle} style={{ width: 40, height: 40, tintColor: index <= currentStep ? COLORS.primary : COLORS.lightGray1 }} />
                  <View
                    style={{
                      marginLeft: SIZES.radius
                    }}
                  >
                    <Text style={{ ...FONTS.h3 }}>{item.title}</Text>
                    <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>{item.sub_title}</Text>
                  </View>
                </View>

                {index < constants.track_order_status.length - 1 &&
                  <View>
                    {index < currentStep &&
                      <View style={{ height: 50, width: 3, marginLeft: 18, backgroundColor: COLORS.primary, zIndex: -1 }} />
                    }

                    {index >= currentStep &&
                      <Image source={icons.dotted_line} style={{ width: 4, height: 50, marginLeft: 17 }} resizeMode='cover' />
                    }
                  </View>
                }
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        {currentStep < constants.track_order_status.length - 1 &&
          <View style={{ flexDirection: 'row', height: 55 }}>
            {/* Cancel */}
            <TextButton 
              buttonContainerStyle={{
                width: '40%',
                borderRadius: SIZES.base,
                backgroundColor: COLORS.lightGray2,
              }}
              label='Cancel'
              labelStyle={{
                color: COLORS.primary
              }}
              onPress={() => navigation.navigate("FoodDetails")}
            />

            {/* Map view */}
            <TextIconButton 
              containerStyle={{
                flex: 1,
                marginLeft: SIZES.radius,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary
              }}
              label={`Map View`}
              labelStyle={{
                color: COLORS.white,
                ...FONTS.h3
              }}
              icon={icons.map}
              iconPosition='LEFT'
              iconStyle={{
                width: 25,
                height: 25,
                marginRight: SIZES.base,
                tintColor: COLORS.white
              }}
              onPress={() => navigation.navigate("Map")}
            />
          </View>
        }

        {currentStep === constants.track_order_status.length - 1 &&
          <TextButton 
            label='Done'
            buttonContainerStyle={{
              height: 55,
              borderRadius: SIZES.radius
            }}
            onPress={() => navigation.navigate("FoodDetails")}
          />
        }
      </View>
    )
  }

  return (
    <View style={{ flex: 1, paddingHorizontal: SIZES.padding, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Info */}
      {renderInfo()}

      {/* Track Order */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
      >
        {renderTrackOrder()}
      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  )
}

export default DeliveryStatus
