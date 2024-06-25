import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CommingSoon } from './Component/CommingSoon';
import { Home1 } from './Bottom';
import { Dowload } from './Component/Dowload';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
//const Bottom = createBottomTabNavigator();
const Bottom = createMaterialBottomTabNavigator();

export function BottomNavigation() {
  const [name, settint] = useState(false);
  return (
    <Bottom.Navigator
      // activeColor="#ffff00"
      // inactiveColor="#faf0e6"
      activeColor='white'
      inactiveColor='gray'
      initialRouteName='Homes'
      barStyle={{ backgroundColor: 'rgba(0, 0, 0, 50)' }}

    >
      <Bottom.Screen name='Homes' component={Home1}  options={{
        tabBarLabel: 'Home',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="home" color={color} size={26} />
        ),
        headerShown: false,
        tabBarStyle: {
          height: '7%',
        }
      }} />

      <Bottom.Screen name='Coming' component={CommingSoon} options={{
        tabBarLabel: 'Coming',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="play-box-multiple" color={color} size = {25} />
          // <Image source={require('../Images/comming1.png')} style={{ height: 23, width: 25, borderRadius: 5,  }} />
        ),
        headerShown: false,
        tabBarStyle: {
          height: '7%',
        }
      }} />

      <Bottom.Screen name='Dowload' component={Dowload} options={{
        tabBarLabel: 'Dowload',
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="download-circle" color={color} size = {25} />
          // <Image source={require('../Images/dowload.png')} style={{ height: 25, width: 25, borderRadius: 5, tintColor: 'white' }} />
        ),
        headerShown: false,
        tabBarStyle: {
          height: '7%',
        }
      }} />
    </Bottom.Navigator>
  )
}
{/* <Bottom.Screen name='search' component={Search} options={{
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Image source={require('../Images/search1.png')} style={{ height: 20, width: 20, borderRadius: 5, margin: 5,tintColor:'white'}} />
        ),
        tabBarStyle: {
          height: '7%',
        }
        
      }} /> */}