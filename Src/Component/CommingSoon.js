import { StyleSheet, Text, View, FlatList, LogBox, StatusBar, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState, memo } from 'react';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import { BallIndicator, MaterialIndicator, UIActivityIndicator } from 'react-native-indicators';
export function CommingSoon() {
    const [MovieComming, setMovieComming] = useState([]);
    const [isLoading, setLoading] = useState(true);
    function Comming() {
        (async () => {
            try {
                await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=6259379dd6aa822c21edcfce778e034a")
                    .then(res => res.json())
                    .then(json => setMovieComming(json.results))
                    .finally(() => setLoading(false));
                // .then(json =>console.log(json))
            }
            catch (err) {
                console.error(err);
            }
        })();
    }
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Each child in a list should have a wunique "key" prop.']);
    })
    return (

        <View style={styles.COntainer}>
            <Comming />
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)', marginTop: '10%', }}>
                <Text style = {{alignSelf:'flex-start',color :'white',fontSize:20,fontStyle:'normal',fontWeight:'bold',}}>CommingSoon</Text>
            </View>
                    <View style={{ flexDirection: "row", }}>
                        <ScrollView>
                            {MovieComming.slice(1, 2).map((data) => {
                                return (
                                    <FlatList data={MovieComming}
                                        keyExtractor={(item, index) => item.key}
                                        initialNumToRender={4} // this is used for memory saving
                                        windowSize={1} // this is used for memory saving
                                        renderItem={({ item, index }) =>
                                        
                                            <View style={styles.ItemView}>
                                                {
                                                    isLoading ? (
                                                        <UIActivityIndicator color='white' style={{ alignSelf: 'center' }} />

                                                    ) : (
                                                        <TouchableOpacity style={{ flexDirection: 'column' }}>
                                                    <Image style={styles.APiImage}
                                                        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`, cache: "force-cache" }}
                                                    />
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 1, }}>
                                                        <Text style={{ color: 'aqua', alignSelf: 'center', fontStyle: 'normal', fontSize: 13, fontWeight: 'bold', paddingLeft: 10 }}>Title</Text>
                                                        <Text style={{ color: 'aqua', alignSelf: 'center', fontStyle: 'normal', fontSize: 13, fontWeight: 'bold' }}>Popularity</Text>
                                                        <Text style={{ color: 'aqua', alignSelf: 'center', fontStyle: 'normal', fontSize: 13, fontWeight: 'bold' }}>Relase Date</Text>
                                                    </View>
                                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 1 }}>
                                                        <Text style={{ color: '#f5f5dc', justifyContent: 'center', alignSelf: 'center', fontStyle: 'italic', fontSize: 10, paddingLeft: 10 }}>{item.title}</Text>
                                                        <Text style={{ color: 'white', justifyContent: 'center', alignSelf: 'center', fontStyle: 'italic', fontSize: 10 }}>{item.popularity}</Text>
                                                        <Text style={{ color: 'white', justifyContent: 'center', alignSelf: 'center', fontStyle: 'italic', fontSize: 10 }}>{item.release_date}</Text>
                                                    </View>
                                                    <View style={{ alignSelf: "flex-start", paddingTop: 2, flexDirection: 'row', flexWrap: 'wrap' }}>
                                                        <Text style={{ color: 'aqua', paddingLeft: 10, fontStyle: 'normal', fontWeight: 'bold', fontSize: 14 }}>Overview</Text>
                                                        <Text numberOfLines={2} style={{ color: '#ffe4c4', paddingLeft: 10, fontStyle: 'normal', fontWeight: 'bold', fontSize: 10, }}>{item.overview}</Text>
                                                    </View>
                                                </TouchableOpacity>
                                                    )
                                                }
                                                
                                            </View>
                                        }
                                    />
                                )
                            })}
                        </ScrollView>
                    </View>
                    
            

        </View>
    )
}
export const DataSaving = memo(CommingSoon);
const styles = StyleSheet.create({
    COntainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
    },
    ItemView: {
        width: '95%',
        height: 230,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: 'black',

    },
    APiImage: {
        width: '100%',
        height: 130,
        borderRadius: 5,
        alignSelf: 'center',
        resizeMode: 'contain'
    }
})