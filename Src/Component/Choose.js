import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput,
    BackHandler,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import DialogInput from "react-native-dialog-input";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { async } from "@firebase/util";
import { useFocusEffect } from "@react-navigation/native";
//import { Home } from "../Bottom";
const Bottom = createBottomTabNavigator();
export function Choose({ navigation, props }) {
    const [visible, setVisible] = useState(false);
    const [check, setCheck] = useState(false);
    const [visible1, setVisible1] = useState(false);
    const [check1, setCheck1] = useState(false);
    const [TouchVisible, setTouchVisible] = useState(false);

    const [input, setInput] = useState('');
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');

    const Logout = async () => {
        await AsyncStorage.setItem("EMAIL", " ")
        //await AsyncStorage.removeItem("EMAIL",);
        //await AsyncStorage.removeItem("PASSWORD");
        console.log('working');
    }
    const hadlebackpress = () =>{
        Alert.alert(
            'Exit App',
            'Are you sure you want to exit the app',[
                {
                    text:'cancel',
                    onPress:()=>null,
                    style:'cancel'
                },
                {
                    text:'Exit',
                    onPress:()=>BackHandler.exitApp(),
                }
            ]
        )
        return true;
    }
    useFocusEffect(
        React.useCallback(()=>{
            BackHandler.addEventListener('hardwareBackPress',hadlebackpress);
        return()=>{
            BackHandler.removeEventListener('hardwareBackPress',hadlebackpress);
        }
        })
    );
    return (
        <View style={styles.firstView}>
            <StatusBar translucent backgroundColor='transparent' />
            {/* <StatusBar translucent backgroundColor={'transparent'} hidden ={false}  animated={true} /> */}
            <View style={{ alignItems: 'flex-end', paddingRight: '3%' }}>
                <TouchableOpacity style={{ paddingTop: "10%" }}
                    onPress={() => {
                        setTouchVisible(true);
                    }}
                >
                    <Image
                        style={{ height: 30, width: 30, borderRadius: 7 }}
                        source={require("/Program Folder/NetflixClone/Images/edits.png")}
                    />
                </TouchableOpacity>
                <View style={{ alignSelf: 'center' }}>
                    <Image source={require('/Program Folder/NetflixClone/Images/netflix1.png')} style={{ height: 70 }} />
                </View>
            </View>
            <View style={{ alignItems: "center" }}>
                <Text style={styles.FirstText}>Who's Watching?</Text>
            </View>
            <View
                style={{
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home', {
                        screen: 'Homes',
                        params: {
                            name: "abc",
                            image: require('/Program Folder/NetflixClone/Images/profile1.png'),

                        }
                        // imageData : require('/Program Folder/NetflixClone/Images/profile1.png')
                    });
                }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 7 }}
                        source={require("/Program Folder/NetflixClone/Images/profile1.png")}
                    />
                    {
                        input ? <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> {input} </Text> :
                            <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> Sanskar </Text>
                    }
                    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => { setVisible(true); }} >
                        {
                            TouchVisible ? <Image
                                style={{ height: 15, width: 15 }}
                                source={require("/Program Folder/NetflixClone/Images/edit.png")}
                            /> : null
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* 2 TouchableOpacity code */}
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home', {
                        screen: 'Homes',
                        params: {
                            name: "abc",
                            image: require('/Program Folder/NetflixClone/Images/profile2.png'),

                        }
                    });
                }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 7 }}
                        source={require("/Program Folder/NetflixClone/Images/profile2.png")}
                    />
                    {
                        input1 ? <Text style={{ color: "white", paddingLeft: 20, fontSize: 15 }}> {input1} </Text> :
                            <Text style={{ color: "white", paddingLeft: 20, fontSize: 15 }}> Shubham </Text>
                    }
                    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setCheck(true)} >
                        {
                            TouchVisible ? <Image
                                style={{ height: 15, width: 15 }}
                                source={require("/Program Folder/NetflixClone/Images/edit.png")}
                            /> : null
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* 3 TouchableOpacity code */}
            </View>
            <View
                style={{
                    padding: 20,
                    flexDirection: "row",
                    justifyContent: "space-around",
                }}
            >
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home', {
                        screen: 'Homes',
                        params: {
                            name: "abc",
                            image: require('/Program Folder/NetflixClone/Images/profile3.png'),

                        }
                    });
                }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 5 }}
                        source={require("/Program Folder/NetflixClone/Images/profile3.png")}
                    />
                    {
                        input2 ? <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> {input2} </Text> :
                            <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> Darling </Text>
                    }
                    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setVisible1(true)}>
                        {
                            TouchVisible ? <Image
                                style={{ height: 15, width: 15 }}
                                source={require("/Program Folder/NetflixClone/Images/edit.png")}
                            /> : null
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
                {/* 4 TouchableOpacity code */}
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Home', {
                        screen: 'Homes',
                        params: {
                            name: "abc",
                            image: require('/Program Folder/NetflixClone/Images/profile4.png'),
                        }
                    });
                }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 7 }}
                        source={require("/Program Folder/NetflixClone/Images/profile4.png")}
                    />
                    {
                        input3 ? <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> {input3} </Text> :
                            <Text style={{ color: "white", paddingLeft: 25, fontSize: 15 }}> ladda </Text>
                    }
                    <TouchableOpacity style={{ alignItems: "flex-end" }} onPress={() => setCheck1(true)}>
                        {
                            TouchVisible ? <Image
                                style={{ height: 15, width: 15 }}
                                source={require("/Program Folder/NetflixClone/Images/edit.png")}
                            /> : null
                        }
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
            <View>
                {/* Screen 1 code */}
                <DialogInput
                    isDialogVisible={visible}
                    title={"Screen Name"}
                    message={" Enter Screen Name"}
                    hintInput={"Enter Text"}
                    submitInput={(text) => {
                        setInput(text),
                            setVisible(false);
                    }}
                    closeDialog={() => setVisible(false)}>
                </DialogInput>
                {/* Screen 2 code */}
                <DialogInput
                    isDialogVisible={check}
                    title={"Screen Name"}
                    message={" Enter Screen Name"}
                    hintInput={"Enter Text"}
                    submitInput={(inputText) => {
                        setInput1(inputText),
                            setCheck(false);
                    }}
                    closeDialog={() => setCheck(false)}>
                </DialogInput>
                {/* Screen 3 code */}
                <DialogInput
                    isDialogVisible={visible1}
                    title={"Screen Name"}
                    message={" Enter Screen Name"}
                    hintInput={"Enter Text"}
                    submitInput={(inputText) => {
                        setInput2(inputText),
                            setVisible1(false);
                    }}
                    closeDialog={() => setVisible1(false)}>
                </DialogInput>
                {/* Screen 4 code */}
                <DialogInput
                    isDialogVisible={check1}
                    title={"Screen Name"}
                    message={" Enter Screen Name"}
                    hintInput={"Enter Text"}
                    submitInput={(text) => {
                        setInput3(text),
                            setCheck1(false);
                    }}
                    closeDialog={() => setCheck1(false)}>
                </DialogInput>
            </View>
            {/* <TouchableOpacity style = {{alignSelf:'center',height:50,width:100,backgroundColor:'red'}} onPress = {()=>{
                Logout();
            }}>

            </TouchableOpacity> */}
        </View>
    );
}

const styles = StyleSheet.create({
    firstView: {
        flex: 1,
        backgroundColor: "black",
    },
    FirstText: {
        fontSize: 25,
        color: "white",
        alignItems: "center",
        fontWeight: "bold",
        paddingTop: "10%",
        fontStyle: "italic",
    },
});

