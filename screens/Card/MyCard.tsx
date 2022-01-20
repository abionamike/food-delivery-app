import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import React, { useState } from 'react'
import { View, Text, ScrollView, ImageSourcePropType } from 'react-native'
import { Header, IconButton, TextButton, CardItem } from '../../components'
import { FONTS, SIZES, COLORS, icons, dummyData } from '../../constants'

export interface ItemProp {
  id: number;
  name: string;
  icon: ImageSourcePropType;
  card_no?: string;
  key: string;
}

const MyCard = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const [selectedCard, setSelectedCard] = useState<null | ItemProp>(null);

  const renderHeader = () => {
    return (
      <Header 
        title='MY CARDS'
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

  const renderAddNewCard = () => {
    return (
      <View
        style={{
          marginTop: SIZES.padding
        }}
      >
        <Text style={{ ...FONTS.h3 }}>Add New Card</Text>

        {dummyData.allCards.map((item, index) => (
          <CardItem key={`NewCard-${item.id}`} item={item} isSelected={`${selectedCard?.key}-${selectedCard?.id}` === `NewCard-${item.id}`} onPress={() => setSelectedCard({ ...item, key: "NewCard" })} />
        ))}
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
          disabled={selectedCard === null}
          buttonContainerStyle={{
            height: 60,
            borderRadius: SIZES.radius,
            backgroundColor: selectedCard === null ? COLORS.gray : COLORS.primary
          }}
          label={selectedCard?.key === "NewCard" ? "Add" : "Place Your Order"}
          onPress={() => {
            if(selectedCard?.key === "NewCard") {
              navigation.navigate("AddCard", { selectedCard })
            } else {
              navigation.navigate("Checkout", { selectedCard })
            }
          }}
        />
      </View>
    )
  }

  return (
    <View style={{ backgroundColor: COLORS.white, flex: 1 }}>
      {/* Header */}
      {renderHeader()}

      {/* Cards */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: SIZES.radius
        }}
      >
        {/* My Cards */}
        {renderMyCards()}

        {/* Add New Card */}
        {renderAddNewCard()}

      </ScrollView>

      {/* Footer */}
      {renderFooter()}
    </View>
  )
}

export default MyCard
