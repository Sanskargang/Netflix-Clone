import { useState } from 'react'
import { View, Text, StatusBar, StyleSheet, TextInput, Image } from 'react-native'
import React from 'react'
export function TextConatainer({ value, onChangeText, placeholder, icon, type, keyboard ,legth}) {
    const [text, setText] = useState(value);
    return (
        <View style={styles.container}>
            <Image source={icon} style={{ width: 30, height: 30, marginTop: 10, marginRight: 10 }} />
            <TextInput placeholder={placeholder}
            style = {{color:'white'}}
            placeholderTextColor = 'white'
                secureTextEntry={type ? true : false}
                keyboardType={keyboard ? 'numeric' : 'default'}
                value={value}
                maxLength = {legth}
               onChangeText={(txt)=>{
                onChangeText(txt);
               }}
            />  
        </View>
        // do not use any text or function copunent because it divert to login ot inside text input compunent
    )
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '85%',
        height: 50,
        borderWidth: 2,
        borderRadius: 10,
        marginTop: 30,
        marginBottom: 10,
        paddingLeft: 15,
        //text:'white',
        borderColor:'white',

    },
})