import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, Image, ImageBackground } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { RootStackParamList } from '../../App';
import { FormInput, FormInputCheck, Header, IconButton, RadioButton, TextButton } from '../../components';
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

  const isEnableAddCard = () => {
    return cardName !== "" && cardNumber !== "" && expiryDate !== "" && cvv !== "" && cardNumberErr === "" && cardNameErr === "" && cvvErr === "" && expiryDateErr === "" 
  }

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
          appendComponent={
            <FormInputCheck 
              value={cardNumber}
              error={cardNumberErr}
            />
          } 
          onChange={(value) => {
            setCardNumber(value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim());

            utils.validateInput(value, 19, setCardNumberErr)
          }} 
          secureTextEntry={false} 
          autoComplete={undefined} 
          autoCapitalize={undefined} 
          errorMsg={cardNumberErr}        
        />

        {/* Card Holder Name */}
        <FormInput 
          label='Cardholder Name'
          value={cardName}
          containerStyle={{
            marginTop: SIZES.radius
          }} 
          inputStyle={undefined} 
          placeholder={''} 
          prependComponent={<></>} 
          appendComponent={
            <FormInputCheck 
              value={cardName}
              error={cardNameErr}
            />
          } 
          onChange={(value) => {
            utils.validateInput(value, 1, setCardNameErr);

            setCardName(value);
          }} 
          secureTextEntry={false} 
          autoComplete={undefined} 
          autoCapitalize={undefined} 
          errorMsg={cardNameErr}        
        />

        {/* Expiry Date / CVV */}
        <View style={{ flexDirection: 'row', marginTop: SIZES.radius }}>
          <FormInput 
            label='Expiry Date'
            value={expiryDate}
            containerStyle={{
              flex: 1
            }} 
            inputStyle={undefined} 
            placeholder={'MM/YY'} 
            maxLength={5}
            prependComponent={<></>} 
            appendComponent={
              <FormInputCheck 
                value={expiryDate}
                error={expiryDateErr}
              />
            } 
            onChange={(value) => {
              utils.validateInput(value, 5, setExpiryDateErr);

              setExpiryDate(value);
            }} 
            secureTextEntry={false} 
            autoComplete={undefined} 
            autoCapitalize={undefined} 
            errorMsg={''}        
          />

          <FormInput 
            label='CVV'
            value={cvv}
            containerStyle={{
              flex: 1,
              marginLeft: SIZES.radius
            }} 
            inputStyle={undefined} 
            placeholder={''} 
            maxLength={3}
            prependComponent={<></>} 
            appendComponent={
              <FormInputCheck 
                value={cvv}
                error={cvvErr}
              />
            } 
            onChange={(value) => {
              utils.validateInput(value, 3, setCvvErr);

              setCvv(value);
            }} 
            secureTextEntry={false} 
            autoComplete={undefined} 
            autoCapitalize={undefined} 
            errorMsg={''}        
          />
        </View>

        {/* Remember section */}
        <View
          style={{
            alignItems: 'flex-start',
            marginTop: SIZES.padding
          }}
        >
          <RadioButton 
            label='Remember this card details.'
            isSelected={isRemeber}
            onPress={() => setIsRemeber(!isRemeber)}
          />
        </View>
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          paddingTop: SIZES.radius,
          paddingBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding
        }}
      >
        <TextButton 
          disabled={!isEnableAddCard()}
          label='Add Card'
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableAddCard() ? COLORS.primary : COLORS.transparentPrimray 
          }}
          onPress={() => navigation.goBack()}
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
      {renderFooter()}
    </View>
  )
}

export default AddCard
