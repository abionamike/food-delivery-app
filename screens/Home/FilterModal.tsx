import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, ScrollView, TouchableWithoutFeedback, Modal, StyleProp, ViewStyle } from 'react-native'
import { concat } from 'react-native-reanimated';
import { IconButton, TextButton, TextIconButton, TwoPointSlider } from '../../components';
import { COLORS, FONTS, SIZES, constants, icons } from '../../constants'

interface FilterModalInterface { 
  isVisible: boolean, 
  onClose: () => void 
}

interface SectionInterface { 
  containerStyle?: StyleProp<ViewStyle>, 
  title: string, 
  children: JSX.Element 
}

const Section = ({ containerStyle, title, children }: SectionInterface) => {
  return (
    <View
      style={[
        {
          marginTop: SIZES.padding
        },
        containerStyle,
      ]}
    >
      <Text style={{ ...FONTS.h3 }}>{title}</Text>

      {children}
    </View>
  )
}

const FilterModal = ({ isVisible, onClose }: FilterModalInterface) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [ratings, setRatings] = useState('');
  const [tags, setTags] = useState('');
  const modalAnimatedValue = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if(showFilterModal) {
      Animated.timing(modalAnimatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false
      }).start();
    } else {
      Animated.timing(modalAnimatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false
      }).start(() => onClose());
    }
  }, [showFilterModal]);

  const modalY = modalAnimatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [SIZES.height, SIZES.height - 680]
  });

  const renderDistance = () => {
    return (
      <Section 
        title='Distance'
      >
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <TwoPointSlider 
            values={[3, 10]}
            min={1}
            max={20}
            postFix="km"
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    )
  }

  const renderDeliveryTime = () => {
    return (
      <Section 
        title='Delivery Time'
        containerStyle={{
          marginTop: 40
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: SIZES.radius
          }}
        >
          {constants.delivery_time.map((item) => (
            <TextButton 
              key={item.id.toString()} 
              label={item.label}  
              labelStyle={{
                color: item.id.toString() === deliveryTime ? COLORS.white : COLORS.gray,
                ...FONTS.body3
              }}
              buttonContainerStyle={{
                width: '30%',
                height: 50,
                margin: 5,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor: item.id.toString() === deliveryTime ? COLORS.primary : COLORS.lightGray2
              }}
              onPress={() => setDeliveryTime(item.id.toString())}
            />
          ))}
        </View>
      </Section>
    )
  }

  const renderPricingRange = () => {
    return (
      <Section title='Pricing Range'>
        <View
          style={{
            alignItems: 'center'
          }}
        >
          <TwoPointSlider 
            values={[10, 50]}
            min={1}
            max={100}
            preFix="$"
            postFix=""
            onValuesChange={(values) => console.log(values)}
          />
        </View>
      </Section>
    )
  }

  const renderRatings = () => {
    return (
      <Section
        title='Ratings'
        containerStyle={{
          marginTop: 40
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}
        >
          {constants.ratings.map((item) => (
            <TextIconButton 
              key={item.id}
              containerStyle={{
                flex: 1,
                margin: 5,
                height: 50,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor: item.id.toString() === ratings ? COLORS.primary : COLORS.lightGray2
              }}
              label={item.label}
              labelStyle={{
                color: item.id.toString() === ratings ? COLORS.white : COLORS.gray,
              }}
              icon={icons.star}
              iconStyle={{
                tintColor: item.id.toString() === ratings ? COLORS.white : COLORS.gray
              }}
              onPress={() => setRatings(item.id.toString())}
            />)
          )}
        </View>
      </Section>
    )
  }

  const renderText = () => {
    return (
      <Section
        title='Tags'
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
          }}
        >
          {constants.tags.map((item) => (
            <TextButton 
              key={item.id.toString()} 
              label={item.label}
              labelStyle={{
                color: item.id.toString() === tags ? COLORS.white : COLORS.gray,
                ...FONTS.body3
              }}
              buttonContainerStyle={{
                height: 50,
                margin: 5,
                paddingHorizontal: SIZES.padding,
                alignItems: 'center',
                borderRadius: SIZES.base,
                backgroundColor: item.id.toString() === tags ? COLORS.primary : COLORS.lightGray2
              }}
              onPress={() => setTags(item.id.toString())}
            />
          ))}
        </View>
      </Section>
    )
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={isVisible}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.transparentBlack7
        }}
      >
        {/* Transparent background */}
        <TouchableWithoutFeedback onPress={() => setShowFilterModal(false)}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}></View>
        </TouchableWithoutFeedback>

        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            top: modalY,
            width: '100%',
            height: '100%',
            padding: SIZES.padding,
            borderTopRightRadius: SIZES.padding,
            borderTopLeftRadius: SIZES.padding,
            backgroundColor: COLORS.white
          }}
        >
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>Filter Your Search</Text>
            <IconButton 
              containerStyle={{
                borderWidth: 2,
                borderRadius: 10, 
                borderColor: COLORS.gray2
              }} 
              icon={icons.cross}
              iconStyle={{
                tintColor: COLORS.gray2
              }}
              onPress={() => setShowFilterModal(false)}
            />
          </View>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 250
            }}
          >
            {/* Distance section */}
            {renderDistance()}

            {/* Delivery Time section */}
            {renderDeliveryTime()}

            {/* Pricing range section */}
            {renderPricingRange()}

            {/* Ratings */}
            {renderRatings()}

            {/* Text section */}
            {renderText()}
          </ScrollView>

          {/* Apply Button */}
          <View
            style={{
              position: 'absolute',
              bottom: 150,
              left: 0,
              right: 0,
              height: 110,
              paddingHorizontal: SIZES.padding,
              paddingVertical: SIZES.radius,
              backgroundColor: COLORS.white
            }}
          >
            <TextButton 
              label='Apply Filters'
              buttonContainerStyle={{
                height: 50,
                borderRadius: SIZES.base,
                backgroundColor: COLORS.primary
              }}
              onPress={() => console.log('Apply Filter')}
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  )
}

export default FilterModal
