import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { SplashScreen } from "./SplashScreen";
import { Choose } from '../Choose';
import { Bottom } from "../../Bottom";
import { SearchBar } from "../SearchBar";
import { Login } from "./Login";
import { Signup } from "./Signup";
import { Detail } from "./Detail";
import { Horror } from "../../Categories/Horror";
const Stack = createNativeStackNavigator();
//initialRouteName="Login"
export function Navigate() {
    return (
        <NavigationContainer >
            <Stack.Navigator>
                <Stack.Screen options={{ headerShown: false }} name="Splash" component={SplashScreen} />
                <Stack.Screen options={{
                    headerShown: false,
                }} name="Login" component={Login} />
                <Stack.Screen options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }} name="Sign" component={Signup} />
                <Stack.Screen options={{ headerShown: false }} name="Choose" component={Choose} />
                <Stack.Screen options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_right'
                }} name="Home" component={Bottom} />
                <Stack.Screen options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_left'
                }} name="SearchBar" component={SearchBar} initialRouteName="Home" />

                <Stack.Screen options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_left'
                }} name="Detail" component={Detail} />

                <Stack.Screen options={{
                    headerShown: false,
                    animationTypeForReplace: 'push',
                    animation: 'slide_from_left'
                }} name="HorrorScreen" component={Horror} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}