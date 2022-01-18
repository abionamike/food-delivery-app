import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import CustomDrawer from "./navigation/CustomDrawer";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { MyCart, FoodDetails, ForgotPassword, OnBoarding, Otp, SignIn, SignUp } from "./screens";
import { MenuListInterface } from "./screens/Home/Home";

export type RootStackParamList = {
    OnBoarding: undefined;
    SignIn: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
    Otp: undefined;
    Home: undefined;
    FoodDetails: { item: MenuListInterface };
    MyCart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'OnBoarding'}
                >
                    <Stack.Screen
                        name="OnBoarding"
                        component={OnBoarding}
                    />

                    <Stack.Screen
                        name="SignIn"
                        component={SignIn}
                    />

                    <Stack.Screen
                        name="SignUp"
                        component={SignUp}
                    />

                    <Stack.Screen
                        name="ForgotPassword"
                        component={ForgotPassword}
                    />

                    <Stack.Screen
                        name="Otp"
                        component={Otp}
                    />
                    <Stack.Screen
                        name="Home"
                        component={CustomDrawer}
                    />
                    <Stack.Screen
                        name="FoodDetails"
                        component={FoodDetails}
                    />
                    <Stack.Screen
                        name="MyCart"
                        component={MyCart}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App