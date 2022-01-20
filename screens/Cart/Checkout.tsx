import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Text } from 'react-native'
import { RootStackParamList } from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'AddCard'>;

const Checkout = ({ navigation, route }: Props) => {
  const { selectedCard } = route.params;

  console.log(selectedCard);

  return (
    <View>
      <Text>Checkout</Text>
    </View>
  )
}

export default Checkout
