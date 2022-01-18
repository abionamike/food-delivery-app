import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { View, Text, Image, ScrollView } from 'react-native'
import { RootStackParamList } from '../../App';
import { CartQunatityButton, Header, IconButton, IconLabel, LineDivider, Rating, StepperInput, TextButton } from '../../components'
import { FONTS, COLORS, SIZES, icons, images, dummyData } from '../../constants'

type Props = NativeStackScreenProps<RootStackParamList, 'FoodDetails'>;

const FoodDetails = ({ route, navigation }: Props) => {
  const { item } = route.params;

  const [foodItem, setFoodItem] = useState(item);
  const [selectedSize, setSelectedSize] = useState<null | number>(null);
  const [quantity, setQuantity] = useState(1);

  const renderHeader = () => {
    return (
      <Header  
        title='DETAILS'
        containerStyle={{
          height: 50,
          marginHorizontal: SIZES.padding,
          marginTop: 40,
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
          <CartQunatityButton quantity={3} />
        }      
      />
    )
  }

  const renderDetails = () => {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
          paddingHorizontal: SIZES.padding
        }}
      >
        {/* Food cart section */}
        <View
          style={{
            height: 190,
            borderRadius: 15,
            backgroundColor: COLORS.lightGray2
          }}
        >
          {/* Calories & Favorite */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: SIZES.base,
              paddingHorizontal: SIZES.radius
            }}
          >
            {/* calories */}
            <View style={{ flexDirection: 'row' }}>
              <Image 
                source={icons.calories}
                style={{ width: 30, height: 30 }}
              />

              <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}>{foodItem.calories} calories</Text>
            </View>

            {/* Favorite */}
            <Image 
              source={icons.love}
              style={{ width: 20, height: 20, tintColor: foodItem.isFavourite ? COLORS.primary : COLORS.gray }}
            />
          </View>

          {/* Food Image */}
          <Image source={foodItem.image} resizeMode='contain' style={{ height: 170, width: '100%' }} />
        </View>

        {/* Food Info */}
        <View style={{ marginTop: SIZES.padding }}>
          {/* Name & Description */}
          <Text style={{ ...FONTS.h1 }}>{foodItem.name}</Text>
          <Text style={{ marginTop: SIZES.base, color: COLORS.darkGray, textAlign: 'justify', ...FONTS.body3 }}>{foodItem.description}</Text>
        
          {/* Ratings, Duration & Shipping */}
          <View style={{ flexDirection: 'row', marginTop: SIZES.padding, }}>
            {/* Rating */}
            <IconLabel 
              containerStyle={{
                backgroundColor: COLORS.primary
              }}
              icon={icons.star}
              label='4.5'
              labelStyle={{
                color: COLORS.white
              }}
            />

            {/* Duration */}
            <IconLabel 
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0
              }}
              icon={icons.clock}
              iconStyle={{
                tintColor: COLORS.black
              }}
              label='30 Mins'
            />

            {/* Shipping */}
            <IconLabel 
              containerStyle={{
                marginLeft: SIZES.radius,
                paddingHorizontal: 0
              }}
              icon={icons.dollar}
              label='Free Shipping'
              labelStyle={{
                color: COLORS.black
              }}
            />

          </View>

          {/* Sizes */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding,
              alignItems: 'center'
            }}
          >
            <Text style={{ ...FONTS.h3 }}>Sizes: </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: SIZES.padding }}>
              {dummyData.sizes.map((item, index) => (
                <TextButton 
                  key={index}  
                  buttonContainerStyle={{
                    width: 55,
                    height: 55,
                    margin: SIZES.base,
                    borderWidth: 1,
                    borderRadius: SIZES.radius,
                    borderColor: selectedSize === item.id ? COLORS.primary : COLORS.gray2,
                    backgroundColor: selectedSize === item.id ? COLORS.primary : 'transparent'
                  }}
                  label={item.label}
                  labelStyle={{
                    color: selectedSize === item.id ? COLORS.white : COLORS.gray2,
                    ...FONTS.body2,
                  }}
                  onPress={() => setSelectedSize(item.id)}
                />
              ))}
            </View>
          </View>
        </View>
      </View>
    )
  }

  const renderRestaurant = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginVertical: SIZES.padding,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}
      >
        <Image source={images.profile} style={{ width: 50, height: 50, borderRadius: SIZES.radius }} />
        
        {/* Info */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            justifyContent: 'center'
          }}
        >
          <Text style={{ ...FONTS.h3 }}>Eat Me</Text>
          <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>1.2 KM away from you</Text>
        </View>
        
        {/* Ratings */}
        <Rating 
          rating={4} 
          iconStyle={{
            marginLeft: 3
          }} 
        />
      </View>
    )
  }

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 120,
          alignItems: 'center',
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius
        }}
      >
        {/* Stepper Input */}
        <StepperInput 
          onAdd={() => setQuantity(quantity + 1)}
          onMins={() => {
            if (quantity > 1) setQuantity(quantity - 1);
          }}
          value={quantity} 
        />

        {/* button */}
        <TextButton 
          buttonContainerStyle={{
            flex: 1,
            flexDirection: 'row',
            height: 60,
            marginLeft: SIZES.radius,
            paddingHorizontal: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary
          }}
          label='Buy Now'
          label2={quantity > 1 ? `-  $${(quantity * 15.99).toFixed(2)}` : '-  $15.99'}
          onPress={() => navigation.navigate("MyCart")}
        />
      </View>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* Header */}
      {renderHeader()}

      {/* Body */}
      <ScrollView>
        {/* Food Details */}
        {renderDetails()}

        <LineDivider />

        {/* restaurant */}
        {renderRestaurant()}
        
        <LineDivider />
      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  )
}

export default FoodDetails;
