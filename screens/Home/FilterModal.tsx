import React, { useEffect, useRef, useState } from 'react'
import { View, Text, Animated, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native'
import { IconButton } from '../../components';
import { COLORS, FONTS, SIZES, constants, icons } from '../../constants'

interface FilterModalInterface { 
  isVisible: boolean, 
  onClose: () => void 
}

const FilterModal = ({ isVisible, onClose }: FilterModalInterface) => {
  const [showFilterModal, setShowFilterModal] = useState(isVisible);
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
  })

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
        </Animated.View>
      </View>
    </Modal>
  )
}

export default FilterModal
