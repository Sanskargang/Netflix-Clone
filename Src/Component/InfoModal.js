import { View, Text,StyleSheet } from 'react-native'
import React, { useState } from 'react';
import Modal from "react-native-modal";

export  function InfoModal() {
    const [ModalVisible,setModalVisible] = useState(false);
  return (
    <View>
      <Modal>
        <View style={{ flex: 1,position:'absolute',top:0}}>
          <Text>I am the modal content!</Text>
        </View>
      </Modal>
    </View>
  )
}