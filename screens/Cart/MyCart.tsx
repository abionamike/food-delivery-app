import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Header, IconButton, CartQunatityButton, StepperInput, FooterTotal } from '../../components';
import { FONTS, SIZES, icons, dummyData, COLORS } from '../../constants';

const CartTab = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
    const [myCartList, setMyCartList] = useState(dummyData.myCart);

    const updateQtyHandler = (newQty: number, id: number) => {
        const newMyCartList = myCartList.map((cl) => (cl.id === id ? {...cl, qty: newQty} : cl))

        setMyCartList(newMyCartList)
    }

    const removeMyCartHandler = (id: number) => {
        let newMyCartList = [...myCartList];

        const index = newMyCartList.findIndex(cart => cart.id === id);

        newMyCartList.splice(index, 1);

        setMyCartList(newMyCartList);
    }

    const renderHeader = () => {
        return (
            <Header 
                title='MY CART'
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
                    <CartQunatityButton quantity={3} />
                }            
            />
        )
    }

    const renderCartList = () => {
        return (
            <SwipeListView 
                data={myCartList}
                keyExtractor={(item) => `${item.id}`}
                contentContainerStyle={{
                    marginTop: SIZES.radius,
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: SIZES.padding * 2
                }}
                disableRightSwipe={true}
                rightOpenValue={-75}
                renderItem={(data, rowMap) => (
                    <View
                        style={[{
                            height: 100,
                            backgroundColor: COLORS.lightGray2
                        }, styles.cartItemContainer]}
                    >
                        {/* Food Image */}
                        <View
                            style={{
                                width: 90,
                                height: 100,
                                marginLeft: -10 
                            }}
                        >
                            <Image source={data.item.image} resizeMode='contain' style={{ width: '100%', height: '100%', position: 'absolute', top: 10 }} />
                        </View>

                        {/* Food Info */}
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...FONTS.body3 }}>{data.item.name}</Text>
                            <Text style={{ ...FONTS.h3, color: COLORS.primary }}>${data.item.price}</Text>
                        </View>

                        {/* Quantity */}
                        <StepperInput 
                           containerStyle={{
                               height: 50,
                               width: 125,
                               backgroundColor: COLORS.white,
                            }} 
                            value={data.item.qty}
                            onAdd={() => updateQtyHandler(data.item.qty + 1, data.item.id)}
                            onMins={() => {
                                if(data.item.qty > 1) {
                                    updateQtyHandler(data.item.qty - 1, data.item.id)
                                }
                            }}
                        />
                    </View>
                )}
                renderHiddenItem={(data, rowMap) => (
                    <View
                        style={{
                            backgroundColor: COLORS.primary,
                            marginTop: 12,
                            height: 100,
                            borderRadius: SIZES.radius,
                            paddingRight: 20,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}
                    >
                        <TouchableOpacity onPress={() => removeMyCartHandler(data.item.id)}>
                            <Image source={icons.delete_icon} style={{ zIndex: 20, height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                )}
            />
        )
    }
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {/* Header */}
            {renderHeader()}

            {/* Cart List Section */}
            {renderCartList()}

            {/* Footer */}
            <FooterTotal 
                subTotal={37.97}
                shippingFee={0.00}
                total={37.97}
                onPress={() => navigation.navigate("MyCard")}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    cartItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius 
    }
})

export default CartTab;