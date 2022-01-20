import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../App';
import { FormInput, Header, IconButton, TextButton } from '../../components';
import { SIZES, COLORS, icons, images, FONTS } from '../../constants';
import { utils } from '../../utils';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

const AddCard = ({ route, navigation }: Props) => {
  const { selectedCard } = route.params;

  const [cardNumber, setCardNumber] = useState('');
  const [cardNumberErr, setCardNumberErr] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNameErr, setCardNameErr] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [expiryDateErr, setExpiryDateErr] = useState('');
  const [cvv, setCvv] = useState('');
  const [cvvErr, setCvvErr] = useState('');
  const [isRemeber, setIsRemeber] = useState(false);

  const renderHeader = () => {
    return (
      <Header 
        title='ADD NEW CARD'
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

  const renderCard = () => {
    return (
      <ImageBackground
        source={images.card}
        style={{
          height: 200,
          width: '100%',
          marginTop: SIZES.radius,
          borderRadius: SIZES.radius,
          overflow: 'hidden'
        }}
      >
        {/* Logo */}
        <Image 
          source={selectedCard.icon}
          resizeMode='contain'
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            height: 20,
            width: 80,
          }}
        />

        {/* Details */}
        <View
          style={{
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding
          }}
        >
          <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{cardName}</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ flex: 1, color: COLORS.white, ...FONTS.body3  }}>{cardNumber}</Text>
            <Text style={{ color: COLORS.white, ...FONTS.body3  }}>{expiryDate}</Text>
          </View>
        </View>
      </ImageBackground>
    )
  }

  const renderForm = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding * 2,
        }}
      >
        {/* Card Number */}
        <FormInput 
          label='Card Number'
          keyboardType='number-pad'
          maxLength={19}
          value={cardNumber}
          containerStyle={undefined} 
          inputStyle={undefined} 
          placeholder={''} 
          prependComponent={<></>} 
          appendComponent={<></>} 
          onChange={(value) => {
            setCardNumber(value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());

            utils.validateInput(value, 19, setCardNumberErr)
          }} 
          secureTextEntry={false} 
          autoComplete={undefined} 
          autoCapitalize={undefined} 
          errorMsg={cardNumberErr}        
        />
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* header */}
      {renderHeader()}

      {/* Body */}
      {<KeyboardAwareScrollView
        keyboardDismissMode='on-drag'
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: SIZES.padding,
        }}
      >
        {/* Card */}
        {renderCard()}

        {/* Forms */}
        {renderForm()}
      </KeyboardAwareScrollView>}

      {/* Footer */}
    </View>
  )
}

export default AddCard
