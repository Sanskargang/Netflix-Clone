import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList, Image, LogBox, TouchableOpacity } from 'react-native';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from "expo-linear-gradient";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";
export function Popular({ props,item}) {
    const num = 1;
    let navigation = useNavigation();
    const [MovieComming, setMovieComming] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    function PopularComming() {
        (async () => {
            try {
                await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6259379dd6aa822c21edcfce778e034a")
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
        <View style={{ flexDirection: 'row' }}>
            <PopularComming />
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
                    {MovieComming.slice(1, 2).map((data) => {
                        return (
                            <FlashList data={MovieComming}
                                horizontal={true}
                                estimatedItemSize={5}
                                //keyExtractor={(item, index) => item.key}
                                initialNumToRender={4} // this is used for memory saving
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
                                                <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row' }} onPress={() => {
                                                    navigation.navigate('Detail',{
                                                        imagedata : item,
                                                        number : num
                                                    })
                                                }}
                                                >
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
        width: 130,
        height: 170,
        borderRadius: 5,
        backgroundColor: 'black',
        marginRight: 10,
        marginTop: 5,
        elevation: 50,
    },
    APiImage: {
        width: '100%',
        height: '100%',
        borderRadius: 5,
        alignSelf: 'center',
        resizeMode: 'contain',
    }
})
//export const DataSaving = memo(Popular);