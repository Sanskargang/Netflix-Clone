import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, Image, LogBox, TouchableOpacity } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
export function Horror({ props, item }) {
    const navigation = useNavigation()
    const [MovieComming, setMovieComming] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    function Now() {
        (async () => {
            try {
                await fetch("http://api.themoviedb.org/3/discover/movie?api_key=6259379dd6aa822c21edcfce778e034a&with_genres=27")
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
        <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0, 0, 0, 0.9)', flex: 1 }}>
            {/* <View style ={{position:"absolute"}}>
            <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image source={require('/Program Folder/NetflixClone/Images/left.png')} style={{ height: 40, width: 40, left: 6, tintColor: 'white' }} />
                </TouchableOpacity>
            </View> */}
            <Now />
            {/* <View style={{ height: '5%', backgroundColor: 'rgba(0, 0, 0, 0.9)', top: '4%', flexDirection: 'row', justifyContent: 'space-between',position:"absolute",width:'100%' }}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <Image source={require('/Program Folder/NetflixClone/Images/left.png')} style={{ height: 40, width: 40, left: 6, tintColor: 'white' }} />
                </TouchableOpacity>
                <Text style={{ color: 'red', fontSize: 20, alignSelf: 'center', fontWeight: 'bold', right: 10 }}>HORROR MOVIES</Text>

            </View> */}
            <ScrollView>
                <View style={{ flexDirection: 'row',}}>
                    {MovieComming.slice(1, 2).map((data) => {
                        return (
                            <FlashList data={MovieComming}
                                numColumns={2}
                                estimatedItemSize={5}
                                //keyExtractor={(item, index) => item.key}
                                //initialNumToRender={4} // this is used for memory saving
                                //windowSize={1} // this is used for memory saving
                                renderItem={({ item, index }) =>

                                    <View style={styles.ItemView3}>
                                        {
                                            isLoading ? (
                                                <ShimmerPlaceholder style={styles.ItemView3}
                                                    shimmerColors={[
                                                        '#564d4d',
                                                        '#8e8e8e',
                                                        '#564d4d',
                                                    ]}
                                                >
                                                </ShimmerPlaceholder>

                                            ) : (
                                                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => {
                                                    navigation.navigate('Detail', {
                                                        imagedata: item
                                                    })
                                                }}>
                                                    <Image style={styles.APiImage}
                                                        source={{ uri: `https://image.tmdb.org/t/p/w500/${item.poster_path}`, cache: "force-cache" }}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    </View>
                                }
                            />
                        )
                    })}
                </View>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    ItemView3: {
        flexDirection: 'row',
        width: '98%',
        height: 170,
        borderRadius: 5,
        backgroundColor: 'black',
        marginRight: 10,
        marginTop: 5,
        elevation: 5,
        top: 70,

    },
    APiImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})
export const DataSaving = memo(Horror);