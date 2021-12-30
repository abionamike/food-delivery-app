import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types';
import { RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList,
    ImageSourcePropType,
    StyleProp,
    ViewStyle
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Home, Search, CartTab, Favourite, Notification } from '.';
import { RootStackParamList } from '../App';
import { Header } from '../components';
import { COLORS, FONTS, SIZES, dummyData, constants, icons } from '../constants';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setSelectedTab } from '../redux/tab/tabSlice';
import LinearGradient from 'react-native-linear-gradient';

// type Main = NativeStackScreenProps<RootStackParamList, 'Home'>;

// type ProfileScreenNavigationProp = Main['navigation'];

interface MainLayoutProps {
    route: RouteProp<Record<string, object | undefined>, "MainLayout">;
    navigation: DrawerNavigationHelpers;
    drawerAnimationStyle: {
        borderRadius: Animated.Node<number>;
        transform: {
            scale: Animated.Node<number>;
        }[];
    }
}

interface TabButtonProps { 
    label: string, 
    icon: ImageSourcePropType, 
    isFocused: boolean, 
    outerContainerStyle: StyleProp<ViewStyle>,
    innerContainerStyle: StyleProp<ViewStyle>,
    onPress: () => void 
}

const TabButton = ({ label, icon, isFocused, outerContainerStyle, innerContainerStyle, onPress }: TabButtonProps) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <Animated.View
                style={[outerContainerStyle,{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }]}
                >
                <Animated.View
                    style={[innerContainerStyle, {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '80%',
                        height: 50,
                        borderRadius: 25,
                    }]}
                >
                    <Image 
                        source={icon}
                        style={{
                            width: 20,
                            height: 20,
                            tintColor: isFocused ? COLORS.white : COLORS.gray
                        }}
                    />
                    {isFocused && (
                        <Text 
                            numberOfLines={1} 
                            style={{ 
                                marginLeft: SIZES.base, 
                                color: COLORS.white, 
                                ...FONTS.h3 
                            }}
                        >
                            {label}
                        </Text>
                    )}
                </Animated.View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const MainLayout = ({ drawerAnimationStyle, navigation }: MainLayoutProps) => {
    const dispatch = useAppDispatch();
    const { selectedTab } = useAppSelector(state => state.tab);

    // Reanimated shared value
    const homeTabFlex = useSharedValue(1);
    const [homeTabColor, setHomeTabColor] = useState({ backgroundColor: COLORS.white });

    const searchTabFlex = useSharedValue(1);
    const [searchTabColor, setSearchTabColor] = useState({ backgroundColor: COLORS.white });

    const cartTabFlex = useSharedValue(1);
    const [cartTabColor, setCartTabColor] = useState({ backgroundColor: COLORS.white });

    const favouriteTabFlex = useSharedValue(1);
    const [favouriteTabColor, setFavouriteTabColor] = useState({ backgroundColor: COLORS.white });

    const notificationTabFlex = useSharedValue(1);
    const [notificationTabColor, setNotificationTabColor] = useState({ backgroundColor: COLORS.white });

    // Reanimated animated style
    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value
        }
    });

    const searchFlexStyle = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value
        }
    });

    const cartFlexStyle = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value
        }
    });

    const favouriteFlexStyle = useAnimatedStyle(() => {
        return {
            flex: favouriteTabFlex.value
        }
    });

    const notificationFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value
        }
    });

    useEffect(() => {
        dispatch(setSelectedTab(constants.screens.home));
    }, []);

    useEffect(() => {
        if(selectedTab === constants.screens.home) {
            homeTabFlex.value = withTiming(4, { duration: 500 });
            setHomeTabColor({ backgroundColor: COLORS.primary });
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 });
            setHomeTabColor({ backgroundColor: COLORS.white });
        }

        if(selectedTab === constants.screens.search) {
            searchTabFlex.value = withTiming(4, { duration: 500 });
            setSearchTabColor({ backgroundColor: COLORS.primary });
        } else {
            searchTabFlex.value = withTiming(1, { duration: 500 });
            setSearchTabColor({ backgroundColor: COLORS.white });
        }

        if(selectedTab === constants.screens.cart) {
            cartTabFlex.value = withTiming(4, { duration: 500 });
            setCartTabColor({ backgroundColor: COLORS.primary });
        } else {
            cartTabFlex.value = withTiming(1, { duration: 500 });
            setCartTabColor({ backgroundColor: COLORS.white });
        }

        if(selectedTab === constants.screens.favourite) {
            favouriteTabFlex.value = withTiming(4, { duration: 500 });
            setFavouriteTabColor({ backgroundColor: COLORS.primary });
        } else {
            favouriteTabFlex.value = withTiming(1, { duration: 500 });
            setFavouriteTabColor({ backgroundColor: COLORS.white });
        }

        if(selectedTab === constants.screens.notification) {
            notificationTabFlex.value = withTiming(4, { duration: 500 });
            setNotificationTabColor({ backgroundColor: COLORS.primary });
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 500 });
            setNotificationTabColor({ backgroundColor: COLORS.white });
        }
    }, [selectedTab])

    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle
            }}
        >
            {/* Header */}
            <Header 
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: 'center'
                }}    
                title={selectedTab.toUpperCase()}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40, 
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.gray,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Image source={icons.menu} />
                    </TouchableOpacity>
                }       
                rightComponent={
                    <TouchableOpacity
                        style={{
                            borderRadius: SIZES.radius,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <Image 
                            source={dummyData.myProfile.profile_image} 
                            style={{ width: 40, height: 40, borderRadius: SIZES.radius }}
                        />
                    </TouchableOpacity>
                }
            />

            {/* Content */}
            <View style={{ flex: 1 }}>
                <Text>MainLayout</Text>
            </View>

            {/* Footer */}
            <View
                style={{
                    height: 100,
                    justifyContent: 'flex-end'
                }}
            >
                {/* Shadow */}
                <LinearGradient 
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 4 }}
                    colors={[
                        COLORS.transparent,
                        COLORS.lightGray1
                    ]}
                    style={{
                        position: 'absolute',
                        top: -20,
                        left: 0,
                        right: 0,
                        height: 100,
                        borderTopRightRadius: 15,
                        borderTopLeftRadius: 15
                    }}
                />

                {/* Tabs */}
                <View 
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: 10,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                >
                    <TabButton 
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab === constants.screens.home}
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeTabColor}
                        onPress={() => dispatch(setSelectedTab(constants.screens.home))}
                    />
                    <TabButton 
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab === constants.screens.search}
                        outerContainerStyle={searchFlexStyle}
                        innerContainerStyle={searchTabColor}
                        onPress={() => dispatch(setSelectedTab(constants.screens.search))}
                    />
                    <TabButton 
                        label={constants.screens.cart}
                        icon={icons.cart}
                        isFocused={selectedTab === constants.screens.cart}
                        outerContainerStyle={cartFlexStyle}
                        innerContainerStyle={cartTabColor}
                        onPress={() => dispatch(setSelectedTab(constants.screens.cart))}
                    />
                    <TabButton 
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab === constants.screens.favourite}
                        outerContainerStyle={favouriteFlexStyle}
                        innerContainerStyle={favouriteTabColor}
                        onPress={() => dispatch(setSelectedTab(constants.screens.favourite))}
                    />
                    <TabButton 
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab === constants.screens.notification}
                        outerContainerStyle={notificationFlexStyle}
                        innerContainerStyle={notificationTabColor}
                        onPress={() => dispatch(setSelectedTab(constants.screens.notification))}
                    />
                </View>
            </View>
        </Animated.View>
    )
}

export default MainLayout;