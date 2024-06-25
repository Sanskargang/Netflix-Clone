import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, StatusBar, SafeAreaView, Image, TouchableOpacity, FlatList, LogBox } from 'react-native'
import { BottomNavigation } from "./BottomNavigation";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { Popular } from "./Component/Popular";
import { TopRated } from "./TopRated";
import { Tredning } from "./TredingMovies";
import { TredningPeople } from "./TredingPeople";
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { TvSeries } from "./TvSeries";
import { BallIndicator, MaterialIndicator, UIActivityIndicator } from 'react-native-indicators';
const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Action & Adventure (1365) ',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Anime (7424)',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Children & Family (783)',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d77',
        title: 'Classic (31574)',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d97',
        title: 'Comedies (6548)',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d127',
        title: 'Documentaries (6839)',
    },
    {
        id: 'D1',
        title: 'Dramas (5763)',
    },
    {
        id: 'H1',
        title: 'Horror (8711)',

    },
    {
        id: 'M1',
        title: 'Music (1701)',
    },
    {
        id: 'R1',
        title: 'Romantic (8883)',
    },
    {
        id: 'S1-F1',
        title: 'Sci-fi & Fantasy (1492)',
    },
    {
        id: 'SP',
        title: 'Sports (4370)',
    },
    {
        id: 'TH',
        title: 'Thrillers (8933)',
    },
    {
        id: 'TV',
        title: 'TV Shows (83)',
    },

];
export function Home1({ navigation, route }) {
    const { image } = route.params // this is main for receiving params
    //console.log(image);
    const [ModalVisible, setModalVisible] = useState(false);
    const [CategoriesModal, setCategoriesModal] = useState(false);
    const [Activity, setActivity] = useState(false);
    // this is a api space
    const [MovieComming, setMovieComming] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [ApiActivity, setApiActivity] = useState(true);
    const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
    function Comming() {
        (async () => {
            try {
                await fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=6259379dd6aa822c21edcfce778e034a")
                    .then(res => res.json())
                    // .then(json =>console.log(json))
                    .then(json => setMovieComming(json.results))
                    .finally(() => setLoading(false));
            }
            catch (err) {
                console.error(err);
            }
        })();
    }
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Each child in a list should have a wunique "key" prop.']);
        setTimeout(() => {
            setActivity(false)
        }, 300)
        setTimeout(() => {
            setApiActivity(false);
        }, 800)
    }, []);

    return (

        <View style={styles.Container}>
            {
                Activity ? (<BallIndicator color='white' style={{ alignSelf: 'center' }} />) :

                    (
                        <ScrollView>
                            <StatusBar translucent backgroundColor='transparent' />
                            <View>
                                <Image source={require('../Images/top6.jpg')} style={{ height: 500, width: 'auto', borderRadius: 5 }} />
                                <TouchableOpacity style={{ position: 'absolute', paddingTop: 50, paddingLeft: 12 }}>
                                    <Image source={require('../Images/logo1.png')} style={styles.LogoStyle} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', paddingTop: 50, paddingRight: 55, }} onPress={() => {
                                    navigation.navigate('SearchBar');
                                }}>
                                    <Image source={require('../Images/search.png')} style={{ height: 29, width: 25, borderRadius: 2 }} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{ position: 'absolute', alignSelf: 'flex-end', paddingTop: 50, paddingRight: 10, }}>

                                    {/* <Image source={require('../Images/profile1.png')} style={{ height: 29, width: 30, borderRadius: 5 }} /> */}
                                    <Image source={(image)} style={{ height: 29, width: 30, borderRadius: 5 }} />
                                    {/* this is how parameter is pass from one screen to another using screen name*/}
                                </TouchableOpacity>
                                <View style={{ position: 'absolute', flexDirection: 'row', alignSelf: "center", }}>
                                    <TouchableOpacity>
                                        <Text style={{ color: '#D1E2DA', alignSelf: "flex-start", paddingTop: "23%", fontSize: 16, paddingRight: "0%" }}>Tv Shows</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('HorrorScreen');
                                    }}>
                                        <Text style={{ color: '#D1E2DA', alignSelf: "flex-start", paddingTop: "23%", fontSize: 16, paddingLeft: "8%" }}>Movies</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flexDirection: 'row', top: 80, height: 35, }}
                                        onPress={() => {
                                            setCategoriesModal(true);
                                        }}
                                    >
                                        <Text style={{ color: '#D1E2DA', alignSelf: "flex-start", paddingTop: "3%", fontSize: 16, paddingLeft: "8%" }}>Categories</Text>
                                        <View style={{ alignSelf: "flex-start", paddingLeft: 8, paddingTop: 17 }}>
                                            <Image source={require('/Program Folder/NetflixClone/Images/drop.png')}
                                                style={styles.drop}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 20, justifyContent: 'flex-end', alignItems: 'center' }}>
                                    <View style={{ flexDirection: "row", paddingBottom: 30 }}>
                                        <Image source={require('/Program Folder/NetflixClone/Images/top10.png')}
                                            style={{ height: 29, width: 24 }} />
                                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>  #5 in TV Shows Today</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", }} >
                                        <TouchableOpacity style={{ paddingRight: "10%" }}>
                                            <Image source={require('/Program Folder/NetflixClone/Images/add.png')}
                                                style={{ height: 19, width: 19 }} />
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 11, }}>List</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ height: 30, width: 70, backgroundColor: 'white', borderRadius: 5, marginLeft: 5, position: 'relative', flexDirection: "row" }}>
                                            <Image source={require('/Program Folder/NetflixClone/Images/button.png')}
                                                style={{ height: 15, width: 15, alignSelf: "center", marginLeft: 5 }} />
                                            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 15, alignSelf: 'center', marginLeft: 12 }}>Play</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ paddingLeft: "12%" }} onPress={() => {
                                            setModalVisible(true);
                                        }}>
                                            <Image source={require('/Program Folder/NetflixClone/Images/info.png')}
                                                style={{ height: 19, width: 19 }} />
                                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 11 }}>Info</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                            <View>
                                <Modal isVisible={ModalVisible} animationType="slide" swipeDirection={"right"}
                                    style={{ width: "90%", marginBottom: 0, }} onBackButtonPress={() => {
                                        setModalVisible(false);
                                    }}
                                    onSwipeComplete={() => {
                                        setModalVisible(false);
                                    }}
                                >
                                    <View style={{ position: 'absolute', bottom: 0, height: "25%", width: "100%", backgroundColor: 'white', borderRadius: 10 }}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                                            <Text style={{ alignSelf: 'center', color: 'black', fontWeight: "bold", fontSize: 18 }}>Movie Info</Text>
                                            <Image source={require('../Images/logo.png')} style={{ height: 20, width: 20, borderRadius: 5, margin: 5 }} />
                                        </View>
                                        <View style={{ flexDirection: "row", }}>
                                            <Image source={require('../Images/top7.jpg')} style={{ height: 100, width: 100, borderRadius: 5, margin: 5, borderColor: 'black', borderWidth: 1.5 }} />
                                            <ScrollView style={{ flexDirection: "coloum" }}>
                                                <Text style={{ color: 'black', fontStyle: 'italic', fontWeight: '400', width: '100%' }}>
                                                    Geralt of Rivia, a mutated monster-hunter for hire,
                                                    journeys toward his destiny in a turbulent world where people often prove more wicked than beasts.
                                                    Watch all you want. Henry Cavill stars in this epic series of monsters, magic and fate,
                                                    based on writer Andrzej Sapkowski's fantasy books.
                                                </Text>
                                            </ScrollView>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                            <View>
                                <Modal isVisible={CategoriesModal} animationType="slide" swipeDirection={"down"} style={{ backgroundColor: "transparent", height: '90%', width: '90%', borderRadius: 10 }}>
                                    <FlatList data={DATA} renderItem={({ item }) =>
                                        <View style={styles.ItemView}>
                                            <ScrollView disableScrollViewPanResponder={true} >
                                                <TouchableOpacity onPress={() => {
                                                    {
                                                        console.log(item.id);
                                                        switch(item.id){
                                                            case 'H1':
                                                                return(
                                                                    navigation.navigate('HorrorScreen')
                                                                )
                                                            case 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba':
                                                                return(
                                                                    console.log('display')
                                                                )
                                                        }
                                                    }
                                                }}>
                                                    <Text style={{ color: 'white', alignSelf: "center", fontSize: 16, fontWeight: '900' }}>{item.title}</Text>
                                                </TouchableOpacity>
                                            </ScrollView>

                                        </View>

                                    } />

                                    <View style={{ top: "-1%" }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCategoriesModal(false);
                                            }}
                                        >
                                            <Image source={require('/Program Folder/NetflixClone/Images/cancel.png')}
                                                style={{ height: 40, width: 40, alignSelf: "center" }}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </Modal>
                            </View>
                            <Text style={{ color: 'white', padding: 10, fontSize: 18, fontStyle: "normal", fontWeight: "bold" }}>Popular on Netflix</Text>
                            {
                                ApiActivity ? (<UIActivityIndicator color='white' style={{ alignSelf: 'center' }} />) : (
                                    <View style={{ position: 'relative' }}>
                                        <Popular />
                                        <Text style={{ color: 'white', padding: 10, fontSize: 18, fontStyle: "normal", fontWeight: "bold" }}>Ariving Today (Latest)</Text>
                                        <TredningPeople />
                                        <Text style={{ color: 'white', padding: 10, fontSize: 18, fontStyle: "normal", fontWeight: "bold" }}>Top Rated</Text>
                                        <TopRated />
                                        <Text style={{ color: 'white', padding: 10, fontSize: 18, fontStyle: "normal", fontWeight: "bold" }}>Trending Movies</Text>
                                        <Tredning />
                                        <Text style={{ color: 'white', padding: 10, fontSize: 18, fontStyle: "normal", fontWeight: "bold" }}>Popular (Tv series)</Text>
                                        <TvSeries />
                                    </View>
                                )
                            }
                        </ScrollView>
                    )
            }

        </View>

    )
}
export function Bottom() {
    return (
        <BottomNavigation />

    )
}

const styles = StyleSheet.create({

    Container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        //zIndex : 100,

    },
    LogoStyle: {
        //position: 'absolute',
        height: 40,
        width: 35,
    },
    drop: {
        height: 15,
        width: 15,
        // alignSelf:'flex-end',

    },
    ItemView: {
        width: '90%',
        height: 45,
        backgroundColor: 'transparent',
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    ItemView1: {
        alignSelf: 'center',
        marginTop: 10,
        borderRadius: 10,
        flexDirection: 'row'
    },
    ItemView3: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap',
        width: 50,
        height: 100,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'black',

    },
    APiImage: {
        width: 50,
        height: 90,
        borderRadius: 5,
        alignSelf: 'center',
        resizeMode: 'contain',
        flexWrap: 'wrap'
    }
})
// style={{ position: 'absolute', flexDirection: 'row', alignSelf: "center", bottom: "5%", }}