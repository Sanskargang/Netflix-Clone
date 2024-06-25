import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Vibration } from 'react-native'


export function Button({ onPress, title, bgcolor, textcolor, disabled }) {
    return (
        <View style={{ width: '80%', paddingTop: 30, flex: 1 }}>
            <TouchableOpacity style={styles.button}
                disabled={disabled}
                onPress={() => {
                    onPress();
                }}
            >
                <Text style={{
                    fontSize: 20, alignItems: 'center', color: 'white',
                }}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'red',
        // width:'80%',
        height: 50,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
})