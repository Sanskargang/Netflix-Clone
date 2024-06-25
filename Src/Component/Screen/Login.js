import { View, Text, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, StatusBar, Alert, BackHandler } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as Animatable from 'react-native-animatable';
import { Signup } from './Signup';
import { TextConatainer } from './TextConatainer';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from './CommonButton';
import { Home1 } from '../../Bottom';
import { firebaseConfig } from './Config'
import * as fire from 'firebase/app'
import * as firebase from 'firebase/auth';
import { SkypeIndicator, } from 'react-native-indicators';
import { useFocusEffect } from "@react-navigation/native";
fire.initializeApp(firebaseConfig);
const auth = firebase.getAuth();
export function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [badEmail, setBadEmail] = useState(false);
  const [badPassword, setBadPassword] = useState(false);
  const [Load, setLoad] = useState(false);

  const login = () => {
    if (email == '') {
      setBadEmail(true);
    }
    else {
      setBadEmail(false);
      if (password == '') {
        setBadPassword(true);
      }
      else {
        setBadPassword(false);
        CheckUser();
        getData();
      }
    }

  }

  const CheckUser = async () => {
    try {
      const userCredential = await firebase.signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigation.navigate('Choose');
      setLoad(false);
    }
    catch (error) {
      alert(error);
      setLoad(false);
    }

  }
  const getData = async () => {
    console.log(mEmail, mPass);
    const mEmail = await AsyncStorage.getItem('EMAIL');
    const mPass = await AsyncStorage.getItem('PASSWORD');


    if (email === mEmail && password === mPass) {

      navigation.navigate('Choose');
    }
    else {
      if (email !== mEmail) {
        Alert.alert("Email ID", "Please Enter correct email id ");
        setLoad(false);
      }
      alert("Wrong Password");
    }
  }
  const hadlebackpress = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the app', [
      {
        text: 'cancel',
        onPress: () => null,
        style: 'cancel'
      },
      {
        text: 'Exit',
        onPress: () => BackHandler.exitApp()
      }
    ]
    )
    return true;
  }
  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', hadlebackpress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', hadlebackpress);
      }
    })
  );
  return (
    <View style={styles.Container}>
      <StatusBar animated={true} />
      <Animatable.View style={{ height: 90, bottom: 55 }}>
        <Animatable.Text style={{ color: 'red', fontSize: 45, }} animation="slideOutDown">NETFLIX
        </Animatable.Text>
      </Animatable.View>

      <Text style={styles.text1}>Login</Text>
      <TextConatainer placeholder={"Enter Email ID"} icon={require('/Program Folder/NetflixClone/Images/email.png')}
        value={email}
        onChangeText={(txt) => {
          setEmail(txt);
        }}

      />
      {
        badEmail === true && (<Text style={{ marginLeft: '10%', color: 'red', alignSelf: 'flex-start' }} >Please Enter Email Id</Text>)
      }
      <TextConatainer placeholder={'Enter Password'} icon={require('/Program Folder/NetflixClone/Images/p1.png')}
        value={password}
        // type={'password'} this is for hidden the element
        onChangeText={(txt) => {
          setPassword(txt);
        }}
      />
      {
        badPassword === true && (<Text style={{ alignSelf: 'flex-start', color: 'red', marginLeft: '10%' }} >Please Enter Password</Text>)
      }
      <TouchableOpacity style={{ height: 50, width: '80%', backgroundColor: 'red', borderRadius: 10, marginTop: "10%", justifyContent: 'center' }}
        onPress={() => {
          setLoad(true);
          login();
        }}>
        {
          Load ? (<SkypeIndicator color='white' style={{ alignSelf: 'center', }} />) : (<Text style={{ textAlign: "center", color: 'white', fontSize: 20, }}>Login</Text>)
        }

      </TouchableOpacity>
      <View style={{ marginTop: "20%" }}>
        {/* <Button title={'Login'} onPress={() => { login() }} /> */}
        <TouchableOpacity style={{ alignSelf: "flex-start" }} onPress={() => {
          navigation.navigate('Sign')
        }}>
          <Text style={styles.text2}>Create New Account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    alignItems: 'center',
    paddingTop: '10%'
  },
  text1: {
    paddingTop: 20,
    fontSize: 29,
    color: 'white',
  },
  text2: {
    fontSize: 19,
    fontStyle: 'italic',
    justifyContent: 'center',
    alignSelf: 'center',
    //  paddingTop: '30%', // this is done through touchable view section style
    textDecorationLine: 'underline',
    color: 'red'
  },
})