import { View, Text, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { TopRated } from "/Program Folder/NetflixClone/Src/TopRated";
export function Detail({ route }) {
  //console.log(route.params.imagedata);
  const selected = route.params.imagedata
  global.num = route.params.number
  // console.log(num);
  return (
    <View style={styles.Container}>
      <StatusBar />
      <View style={{ top: 10 }}>
        <Image style={{ width: '100%', height: '53%', borderRadius: 10 }}
          source={{ uri: `https://image.tmdb.org/t/p/w500/${selected.poster_path}`, cache: "force-cache" }}
        />
        <View style={{ flexDirection: 'row', marginTop: 9, justifyContent: 'space-evenly' }}>
          <Text style={{ color: '#faebd7', fontSize: 20, fontWeight: 'bold', }}>Title : </Text>
          <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>{selected.title}</Text>
          <Text style={{ color: '#faebd7', fontSize: 20, fontWeight: 'bold', }}>Rating:</Text>
          <Text style={{ color: 'white', fontSize: 18, fontStyle: 'italic' }}>{selected.vote_average}/10</Text>
        </View>
        <View style={{ marginTop: 5 }}>
          <Text style={{ color: '#faebd7', fontSize: 20, marginLeft: 10, fontWeight: 'bold', }}>Overview</Text>
          <Text style={{ color: 'white', fontSize: 15, marginLeft: 10 }}>{selected.overview}</Text>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 9, justifyContent: 'space-evenly' }}>
          <Text style={{ color: '#faebd7', fontSize: 18, fontWeight: 'bold', }}>Relase Date :</Text>
          <Text style={{ color: 'white', fontSize: 17, }}>{selected.release_date}</Text>
          <Text style={{ color: '#faebd7', fontSize: 18, fontWeight: 'bold', }}>Language :</Text>
          <Text style={{ color: 'white', fontSize: 18, }}>{selected.original_language}</Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <TopRated />
        </View>
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  }
})