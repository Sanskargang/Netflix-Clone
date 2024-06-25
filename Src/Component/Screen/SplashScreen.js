import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, StatusBar, Button, LogBox } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Choose } from '../Choose';
import { firebaseConfig } from './Config'
import * as fire from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av'
fire.initializeApp(firebaseConfig);
const auth = getAuth();
const user = auth.currentUser;
//console.log(auth);
export function SplashScreen() {
  const [sound, setSound] = useState();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    LogBox.ignoreAllLogs()
    setTimeout(() => {
      getData();
    }, 4000)
  }, []);
  // const CheckUser = () => {
  //   onAuthStateChanged(auth, (use) => {
  //     if (use !== null) {
  //       //console.log('splash screen');
  //       //navigation.navigate('Choose')
  //       //const uid = user.uid;
  //     } else {
  //       navigation.navigate('Login')
  //     }
  //   });
  // }
  const getData = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    const pass = await AsyncStorage.getItem('PASSWORD');
    //console.log(email);
    if (email === null || email === undefined) {
      navigation.navigate('Login');
    }
    else {
      navigation.navigate('Choose');
    }

  }

  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(require('./netflixsound.mp3')
    );
    setSound(sound);
    console.log('Playing Sound');
    await sound.playAsync();
  }
  function UnloadAudio() {
    useEffect(() => {
      return sound
        ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
        : undefined;
    }, [sound]);
  }
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        playSound();
      }
    })
  )
  return (
    <View style={styles.animationContainer}>
      <StatusBar translucent backgroundColor='transparent' />
      <LottieView
        autoPlay
        style={{
          width: 300,
          height: 340,
          backgroundColor: 'black',
        }}
        source={require('../Screen/Animation.json')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

// useEffect(() => {
//   setTimeout(() => {
//     navigation.navigate('Choose');
//   }, 4000)
// }, []);


// function NavigateToAuthUser(){
//   //const {currentUser} = firebase.getAuth();
//   setTimeout(function (){
//     if(currentUser != null){
//       navigation.navigate('Choose');
//     }
//     else{
//       navigation.navigate('Login');
//     }
//   },1000)
// }

// const getData = async () => {
//   const email = await AsyncStorage.getItem('EMAIL');
//   //console.log(email);
//   if (email !== '' || email !== null || email !== undefined) {
//     navigation.navigate('Choose');
//   }
//   else {
//     navigation.navigate('Login');
//   }

// }