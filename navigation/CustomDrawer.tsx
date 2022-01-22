import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import React, { useState } from 'react'
import { View, Text, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import Animated from 'react-native-reanimated'
import { RootStackParamList } from '../App'
import { COLORS, FONTS, SIZES, constants, dummyData, icons } from '../constants'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { setSelectedTab } from '../redux/tab/tabSlice'
import { MainLayout } from '../screens'

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }: { label: string, icon: ImageSourcePropType, isFocused?: boolean, onPress?: () => void }) => {
  return (
    <TouchableOpacity 
      style={{ 
        flexDirection: 'row', 
        height: 40, 
        marginBottom: SIZES.base, 
        alignItems: 'center', 
        paddingLeft: SIZES.radius, 
        borderRadius: SIZES.base,
        backgroundColor: isFocused ? COLORS.transparentBlack1 : 'transparent'
      }}
      onPress={onPress}
    >
      <Image source={icon} style={{ width: 20, height: 20, tintColor: COLORS.white }} />
      <Text style={{ marginLeft: 15, color: COLORS.white, ...FONTS.h3 }}>{label}</Text>
    </TouchableOpacity>
  )
}

const CustomDrawerContent = ({ navigation }: { navigation: DrawerNavigationHelpers }) => {
  const dispatch = useAppDispatch();
  const { selectedTab } = useAppSelector(state => state.tab);

  return (
    <DrawerContentScrollView scrollEnabled={true} contentContainerStyle={{ flex: 1 }}>
      <View
        style={{ flex: 1, paddingHorizontal: SIZES.radius }}
      >
        {/* close button */}
        <View
          style={{ alignItems: 'flex-start', justifyContent: 'center' }}
        >
          <TouchableOpacity 
            style={{ alignItems: 'center', justifyContent: 'center' }}
            onPress={() => navigation.closeDrawer()}
          >
            <Image source={icons.cross} style={{ height: 35, width: 35, tintColor: COLORS.white }} />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity 
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            alignItems: 'center'
          }}
          onPress={() => console.log('profile')}
        >
          <Image source={dummyData.myProfile.profile_image} style={{ width: 50, height: 50, borderRadius: SIZES.radius }} />
          <View
            style={{ marginLeft: SIZES.radius }}
          >
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{dummyData.myProfile.name}</Text>
            <Text style={{ color: COLORS.white, ...FONTS.body4 }}>View your profile</Text>
          </View>
        </TouchableOpacity>

        {/* Drawer Items */}
        <View style={{
          flex: 1,
          marginTop: SIZES.padding,
        }}>
          <CustomDrawerItem 
            label={constants.screens.home} 
            icon={icons.home} 
            isFocused={selectedTab === constants.screens.home}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.home));

              navigation.navigate("MainLayout");
            }} 
          />
          <CustomDrawerItem 
            label={constants.screens.my_wallet} 
            icon={icons.wallet} 
            isFocused={selectedTab === constants.screens.my_wallet}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.my_wallet));

              navigation.navigate("MainLayout");
            }} 
          />
          <CustomDrawerItem 
            label={constants.screens.notification} 
            icon={icons.notification} 
            isFocused={selectedTab === constants.screens.notification}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.notification));

              navigation.navigate("MainLayout");
            }} 
          />
          <CustomDrawerItem 
            label={constants.screens.favourite} 
            icon={icons.favourite} 
            isFocused={selectedTab === constants.screens.favourite}
            onPress={() => {
              dispatch(setSelectedTab(constants.screens.favourite));

              navigation.navigate("MainLayout");
            }} 
          />

          {/* Line divider */}
          <View style={{ height: 1, marginVertical: SIZES.radius, marginLeft: SIZES.radius, backgroundColor: COLORS.lightGray1 }} />
          
          <CustomDrawerItem label={"Track Your Order"} icon={icons.location} />
          <CustomDrawerItem label={"Coupons"} icon={icons.coupon} />
          <CustomDrawerItem label={"Settings"} icon={icons.setting} />
          <CustomDrawerItem label={"Invite  a Friend"} icon={icons.profile} />
          <CustomDrawerItem label={"Help Center"} icon={icons.help} />
        </View>

        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <CustomDrawerItem label={"Logout"} icon={icons.logout} onPress={() => navigation.navigate("SignIn")} />
        </View>
      </View>
    </DrawerContentScrollView>
  )
}

const CustomDrawer = () => {
  const [progress, setProgress] = useState<Animated.Node<number>>(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8]
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26]
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.primary }}>
      <Drawer.Navigator
        drawerType='slide'
        overlayColor='transparent'
        drawerStyle={{
          flex: 1,
          width: '65%',
          backgroundColor: 'transparent'
        }}
        sceneContainerStyle={{
          backgroundColor: 'transparent'
        }}
        initialRouteName='MainLayout'
        drawerContent={props => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);

          return (
            <CustomDrawerContent navigation={props.navigation} />
          )
        }}
      >
        <Drawer.Screen name='MainLayout'>
          {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  )
}

export default CustomDrawer
