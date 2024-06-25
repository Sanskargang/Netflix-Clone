import { View, Text, StyleSheet, StatusBar, SafeAreaView, FlatList, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from "react";
import { LogBox } from 'react-native';
// const MovieData = [
//   {
//     "adult": false,
//     "backdrop_path": "data:image/jpeg;base64,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",
//     "id": 753342,
//     "original_language": "en",
//     "original_title": "Napoleon",
//     "overview": "An epic that details the checkered rise and fall of French Emperor Napoleon Bonaparte and his relentless journey to power through the prism of his addictive, volatile relationship with his wife, Josephine.",
//     "popularity": 1811.36,
//     "poster_path": "/jE5o7y9K6pZtWNNMEw3IdpHuncR.jpg",
//     "release_date": "2023-11-22",
//     "title": "Napoleon",
//     "video": false,
//     "vote_average": 6.53,
//     "vote_count": 1256
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/vdpE5pjJVql5aD6pnzRqlFmgxXf.jpg",
//     "genre_ids": [
//       18,
//       36
//     ],
//     "id": 906126,
//     "original_language": "es",
//     "original_title": "La sociedad de la nieve",
//     "overview": "On October 13, 1972, Uruguayan Air Force Flight 571, chartered to take a rugby team to Chile, crashes into a glacier in the heart of the Andes.",
//     "popularity": 1145.414,
//     "poster_path": "/2e853FDVSIso600RqAMunPxiZjq.jpg",
//     "release_date": "2023-12-13",
//     "title": "Society of the Snow",
//     "video": false,
//     "vote_average": 8.054,
//     "vote_count": 988
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/rz8GGX5Id2hCW1KzAIY4xwbQw1w.jpg",
//     "genre_ids": [
//       28,
//       35,
//       80
//     ],
//     "id": 955916,
//     "original_language": "en",
//     "original_title": "Lift",
//     "overview": "An international heist crew, led by Cyrus Whitaker, race to lift $500 million in gold from a passenger plane at 40,000 feet.",
//     "popularity": 1559.125,
//     "poster_path": "/46sp1Z9b2PPTgCMyA87g9aTLUXi.jpg",
//     "release_date": "2024-01-10",
//     "title": "Lift",
//     "video": false,
//     "vote_average": 6.21,
//     "vote_count": 257
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/dvNrgldueQciabkYmlCnyhmaPoO.jpg",
//     "genre_ids": [
//       28,
//       9648,
//       53,
//       27
//     ],
//     "id": 899445,
//     "original_language": "en",
//     "original_title": "Deep Fear",
//     "overview": "A solo trip aboard a yacht takes a terrifying turn when a woman encounters three drug traffickers clinging to the shattered remains of a boat. They soon force her to dive into shark-infested waters to retrieve kilos of cocaine from the sunken wreck.",
//     "popularity": 934.849,
//     "poster_path": "/ruujFw7J0Nd3BSjbN3QODym82Qs.jpg",
//     "release_date": "2023-10-18",
//     "title": "Deep Fear",
//     "video": false,
//     "vote_average": 5.3,
//     "vote_count": 56
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/jXJxMcVoEuXzym3vFnjqDW4ifo6.jpg",
//     "genre_ids": [
//       28,
//       12,
//       14
//     ],
//     "id": 572802,
//     "original_language": "en",
//     "original_title": "Aquaman and the Lost Kingdom",
//     "overview": "Black Manta, still driven by the need to avenge his father's death and wielding the power of the mythic Black Trident, will stop at nothing to take Aquaman down once and for all. To defeat him, Aquaman must turn to his imprisoned brother Orm, the former King of Atlantis, to forge an unlikely alliance in order to save the world from irreversible destruction.",
//     "popularity": 924.781,
//     "poster_path": "/8xV47NDrjdZDpkVcCFqkdHa3T0C.jpg",
//     "release_date": "2023-12-20",
//     "title": "Aquaman and the Lost Kingdom",
//     "video": false,
//     "vote_average": 6.547,
//     "vote_count": 534
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/mSJ18SvWHShacTp8BcqH5WRCkGQ.jpg",
//     "genre_ids": [
//       28,
//       53
//     ],
//     "id": 927107,
//     "original_language": "en",
//     "original_title": "The Bricklayer",
//     "overview": "Someone is blackmailing the CIA by assassinating foreign journalists and making it look like the agency is responsible. As the world begins to unite against the U.S., the CIA must lure its most brilliant – and rebellious – operative out of retirement, forcing him to confront his checkered past while unraveling an international conspiracy.",
//     "popularity": 756.899,
//     "poster_path": "/pwOQ9lqLX1OgsJRSybS662wMcu8.jpg",
//     "release_date": "2024-01-03",
//     "title": "The Bricklayer",
//     "video": false,
//     "vote_average": 6.655,
//     "vote_count": 42
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/rVJfabCz1ViynQCEz54MRqdZig1.jpg",
//     "genre_ids": [
//       16,
//       878,
//       28
//     ],
//     "id": 1155089,
//     "original_language": "en",
//     "original_title": "Justice League: Crisis on Infinite Earths Part One",
//     "overview": "Death is coming. Worse than death: oblivion. Not just for our Earth, but for everyone, everywhere, in every universe! Against this ultimate destruction, the mysterious Monitor has gathered the greatest team of Super Heroes ever assembled. But what can the combined might of Superman, Wonder Woman, Batman, The Flash, Green Lantern and hundreds of Super Heroes from multiple Earths even do to save all of reality from an unstoppable antimatter armageddon?!",
//     "popularity": 828.201,
//     "poster_path": "/zR6C66EDklgTPLHRSmmMt5878MR.jpg",
//     "release_date": "2024-01-09",
//     "title": "Justice League: Crisis on Infinite Earths Part One",
//     "video": false,
//     "vote_average": 7.84,
//     "vote_count": 94
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg",
//     "genre_ids": [
//       28,
//       53
//     ],
//     "id": 866398,
//     "original_language": "en",
//     "original_title": "The Beekeeper",
//     "overview": "One man’s campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.",
//     "popularity": 815.152,
//     "poster_path": "/A7EByudX0eOzlkQ2FIbogzyazm2.jpg",
//     "release_date": "2024-01-10",
//     "title": "The Beekeeper",
//     "video": false,
//     "vote_average": 7.593,
//     "vote_count": 108
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/feSiISwgEpVzR1v3zv2n2AU4ANJ.jpg",
//     "genre_ids": [
//       878,
//       12,
//       28
//     ],
//     "id": 609681,
//     "original_language": "en",
//     "original_title": "The Marvels",
//     "overview": "Carol Danvers, aka Captain Marvel, has reclaimed her identity from the tyrannical Kree and taken revenge on the Supreme Intelligence. But unintended consequences see Carol shouldering the burden of a destabilized universe. When her duties send her to an anomalous wormhole linked to a Kree revolutionary, her powers become entangled with that of Jersey City super-fan Kamala Khan, aka Ms. Marvel, and Carol’s estranged niece, now S.A.B.E.R. astronaut Captain Monica Rambeau. Together, this unlikely trio must team up and learn to work in concert to save the universe.",
//     "popularity": 1115.524,
//     "poster_path": "/9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg",
//     "release_date": "2023-11-08",
//     "title": "The Marvels",
//     "video": false,
//     "vote_average": 6.376,
//     "vote_count": 940
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/yOm993lsJyPmBodlYjgpPwBjXP9.jpg",
//     "genre_ids": [
//       35,
//       10751,
//       14
//     ],
//     "id": 787699,
//     "original_language": "en",
//     "original_title": "Wonka",
//     "overview": "Willy Wonka – chock-full of ideas and determined to change the world one delectable bite at a time – is proof that the best things in life begin with a dream, and if you’re lucky enough to meet Willy Wonka, anything is possible.",
//     "popularity": 583.941,
//     "poster_path": "/qhb1qOilapbapxWQn9jtRCMwXJF.jpg",
//     "release_date": "2023-12-06",
//     "title": "Wonka",
//     "video": false,
//     "vote_average": 7.096,
//     "vote_count": 1035
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/oQ429AcD85ttxvOxAaYpETnAsW0.jpg",
//     "genre_ids": [
//       28,
//       10752
//     ],
//     "id": 918692,
//     "original_language": "ru",
//     "original_title": "Гранит",
//     "overview": "Mozambique requests from Russia is being helped in the fight against militants of the \"Islamic State\" and a special group led by a commander with the call sign Granit is coming to the country.",
//     "popularity": 824.298,
//     "poster_path": "/zLJn4U2qlWIzlFP5SsyFJUDQjfs.jpg",
//     "release_date": "2021-12-29",
//     "title": "Granit",
//     "video": false,
//     "vote_average": 5.667,
//     "vote_count": 6
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/k1KrbaCMACQiq7EA0Yhw3bdzMv7.jpg",
//     "genre_ids": [
//       16,
//       10751,
//       10402,
//       14,
//       35
//     ],
//     "id": 901362,
//     "original_language": "en",
//     "original_title": "Trolls Band Together",
//     "overview": "When Branch's brother, Floyd, is kidnapped for his musical talents by a pair of nefarious pop-star villains, Branch and Poppy embark on a harrowing and emotional journey to reunite the other brothers and rescue Floyd from a fate even worse than pop-culture obscurity.",
//     "popularity": 478.652,
//     "poster_path": "/bkpPTZUdq31UGDovmszsg2CchiI.jpg",
//     "release_date": "2023-10-12",
//     "title": "Trolls Band Together",
//     "video": false,
//     "vote_average": 7.21,
//     "vote_count": 548
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/t9rOTMHcE26MqcTSRF1LUicsY5b.jpg",
//     "genre_ids": [
//       16,
//       35,
//       10751
//     ],
//     "id": 1075794,
//     "original_language": "en",
//     "original_title": "Leo",
//     "overview": "Jaded 74-year-old lizard Leo has been stuck in the same Florida classroom for decades with his terrarium-mate turtle. When he learns he only has one year left to live, he plans to escape to experience life on the outside but instead gets caught up in the problems of his anxious students — including an impossibly mean substitute teacher.",
//     "popularity": 491.749,
//     "poster_path": "/pD6sL4vntUOXHmuvJPPZAgvyfd9.jpg",
//     "release_date": "2023-11-17",
//     "title": "Leo",
//     "video": false,
//     "vote_average": 7.544,
//     "vote_count": 834
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/3iVgZBgx57QPjv2GhxvHGFeFNyv.jpg",
//     "genre_ids": [
//       28,
//       878
//     ],
//     "id": 491854,
//     "original_language": "en",
//     "original_title": "Foxtrot Six",
//     "overview": "Escalating climate change is turning the world economy upside down. With crops dying and food price spiking, FOOD has replaced oil as the world's most valuable commodity.  Among the very few lands still left fertile, Indonesia is quickly rising as the next economic superpower, when its government is suddenly and ruthlessly overtaken by a popular rogue political party.  In just three days, six former Marines must work together, find their long-lost brotherhood, stop a nationwide government- sanctioned genocide, and save millions of lives, for one last shot at redemption. Or die trying.",
//     "popularity": 454.544,
//     "poster_path": "/o7c8FKCZFIrLKrZSzgqufvNo4mr.jpg",
//     "release_date": "2019-02-21",
//     "title": "Foxtrot Six",
//     "video": false,
//     "vote_average": 6.2,
//     "vote_count": 33
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/fm6KqXpk3M2HVveHwCrBSSBaO0V.jpg",
//     "genre_ids": [
//       18,
//       36
//     ],
//     "id": 872585,
//     "original_language": "en",
//     "original_title": "Oppenheimer",
//     "overview": "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II.",
//     "popularity": 469.788,
//     "poster_path": "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
//     "release_date": "2023-07-19",
//     "title": "Oppenheimer",
//     "video": false,
//     "vote_average": 8.118,
//     "vote_count": 6184
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/e0M3WVJm4nBrAg0LbJq0gdKi3U7.jpg",
//     "genre_ids": [
//       18,
//       878,
//       28
//     ],
//     "id": 695721,
//     "original_language": "en",
//     "original_title": "The Hunger Games: The Ballad of Songbirds & Snakes",
//     "overview": "64 years before he becomes the tyrannical president of Panem, Coriolanus Snow sees a chance for a change in fortunes when he mentors Lucy Gray Baird, the female tribute from District 12.",
//     "popularity": 471.636,
//     "poster_path": "/mBaXZ95R2OxueZhvQbcEWy2DqyO.jpg",
//     "release_date": "2023-11-15",
//     "title": "The Hunger Games: The Ballad of Songbirds & Snakes",
//     "video": false,
//     "vote_average": 7.235,
//     "vote_count": 1506
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg",
//     "genre_ids": [
//       16,
//       10751,
//       12,
//       14,
//       35
//     ],
//     "id": 502356,
//     "original_language": "en",
//     "original_title": "The Super Mario Bros. Movie",
//     "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.",
//     "popularity": 418.97,
//     "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
//     "release_date": "2023-04-05",
//     "title": "The Super Mario Bros. Movie",
//     "video": false,
//     "vote_average": 7.7,
//     "vote_count": 7834
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/nIiSCZvxDeCeXrOJnpbmRB8FcKH.jpg",
//     "genre_ids": [
//       28,
//       80,
//       18
//     ],
//     "id": 79026,
//     "original_language": "en",
//     "original_title": "El padrino",
//     "overview": "In the streets of East Los Angeles, Manny is a formidable drug dealer. Impressed by his extravagant lifestyle and prowess, his young son, Kilo, yearns to follow in his footsteps. Kilo resolves to learn how to prosper in the drug world, and his new life as a dealer begins. In a world where a man wants everything, he may end up with nothing.",
//     "popularity": 517.04,
//     "poster_path": "/10J7EQ8WvMYku8lcZrLewV2Ko4I.jpg",
//     "release_date": "2004-09-27",
//     "title": "El padrino: The Latin Godfather",
//     "video": false,
//     "vote_average": 6.9,
//     "vote_count": 33
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/r9oTasGQofvkQY5vlUXglneF64Z.jpg",
//     "genre_ids": [
//       28,
//       35
//     ],
//     "id": 1029575,
//     "original_language": "en",
//     "original_title": "The Family Plan",
//     "overview": "Dan Morgan is many things: a devoted husband, a loving father, a celebrated car salesman. He's also a former assassin. And when his past catches up to his present, he's forced to take his unsuspecting family on a road trip unlike any other.",
//     "popularity": 409.079,
//     "poster_path": "/a6syn9qcU4a54Lmi3JoIr1XvhFU.jpg",
//     "release_date": "2023-12-14",
//     "title": "The Family Plan",
//     "video": false,
//     "vote_average": 7.372,
//     "vote_count": 742
//   },
//   {
//     "adult": false,
//     "backdrop_path": "/sRLC052ieEzkQs9dEtPMfFxYkej.jpg",
//     "genre_ids": [
//       878,
//       18,
//       28
//     ],
//     "id": 848326,
//     "original_language": "en",
//     "original_title": "Rebel Moon - Part One: A Child of Fire",
//     "overview": "When a peaceful colony on the edge of the galaxy finds itself threatened by the armies of the tyrannical Regent Balisarius, they dispatch Kora, a young woman with a mysterious past, to seek out warriors from neighboring planets to help them take a stand.",
//     "popularity": 409.425,
//     "poster_path": "/ui4DrH1cKk2vkHshcUcGt2lKxCm.jpg",
//     "release_date": "2023-12-15",
//     "title": "Rebel Moon - Part One: A Child of Fire",
//     "video": false,
//     "vote_average": 6.432,
//     "vote_count": 1251
//   }
//   // "total_pages": 42367,
//   // "total_results": 847330

// ]
//console.log(arr);
export function SearchBar({ navigation }) {
  const [SearchMovie, setSearchMovies] = useState([]);
  function Checkdata() {
    (async () => {
      try {
        await fetch("https://api.themoviedb.org/3/discover/movie?api_key=6259379dd6aa822c21edcfce778e034a")
          .then(res => res.json())
          .then(json => setSearchMovies(json.results))
      }
      catch (err) {
        console.error(err);
      }
    })();
  }
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested', 'Each child in a list should have a wunique key']);
  })

  return (
    <View style={styles.container}>
      <StatusBar translucent={false} backgroundColor={'rgba(0, 0, 0, 0.9)'} />
      <View style={{ flexDirection: "row", marginTop: 10, alignItems: 'center' }}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => {
          navigation.goBack();
        }}>
          <Image source={require('/Program Folder/NetflixClone/Images/left.png')} style={{ height: 30, width: 30, tintColor: 'white' }} />
        </TouchableOpacity>
        <TextInput style={{ width: '80%', height: 40, backgroundColor: 'black', marginLeft: "4%", textAlign: "center" }} placeholder="Enter The Movie Name" placeholderTextColor={'white'}>
        </TextInput>
      </View>
      <Checkdata />
      <ScrollView>
        {SearchMovie.slice(1, 2).map((data) => {
          return (
            <FlatList data={SearchMovie}
              renderItem={({ item, index }) =>
                <View style={styles.ItemView}>
                  <TouchableOpacity style={{ flexDirection: 'row' }}>
                    <Image style={{ width: '25%', height: 70, borderRadius: 2 }}
                      source={{ uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`, cache: "force-cache" }}
                    />
                    <Text style={{ color: 'white', justifyContent: 'center', alignSelf: 'center', paddingLeft: 10 }}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          )
        })}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  ItemView: {
    width: '90%',
    height: 70,
    backgroundColor: 'black',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    flexDirection: 'column',
  },
  movieImage: {
    width: 100,
    height: 100,
  }

})
{/* <FlatList data={MovieData}
        renderItem={({ item, index }) =>
          <View style={styles.ItemView}>
            <Image source={{uri:item.backdrop_path}} style = {{height:90,width:80}}/>
            <Text style={{ color: 'white', justifyContent: 'center', alignSelf: 'center' }}>{item.title}</Text>
          </View>
        }
      /> */}

// function Checkdata() {
//   (async () => {
//     const url = 'https://fakestoreapi.com/products/1';
//     const options = {
//       method: 'GET',
//       headers: {
//         'X-RapidAPI-Key': 'fd57a1ee21msh076a3d309eea722p17503fjsn9b403c782bfb',
//         'X-RapidAPI-Host': 'imdb188.p.rapidapi.com'
//       }
//     };

//     try {
//       const response = await fetch(url, options);
//       const result = await response.text();
//       //console.log(result);
//       setMovies(result);
//     } catch (error) {
//       console.error(error);
//     }


// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MjU5Mzc5ZGQ2YWE4MjJjMjFlZGNmY2U3NzhlMDM0YSIsInN1YiI6IjY1YTNhZjIxMjY2Nzc4MDEyZTY0NWU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.yZK9Gd8eJEhc8VFgFO2DuQzkruDo2qHF-iOPpCE5uFc'
//   }
// };

// fetch('https://api.themoviedb.org/3/movie/changes?page=1', options)
//   .then(response => response.json())
//   .then(response => {
//     setMovies(response);
//   })
//   .catch(err => console.error(err));
//console.log(response)
//   })();
// }
{/* <FlatList data={Movie} renderItem={({ item }) =>
        <View style={styles.ItemView}>
          <Text style={{ color: 'white', justifyContent: 'center', alignSelf: 'center' }}>{Movie}</Text>
        </View>
      } /> */}

      // ItemView: {
      //   width: '90%',
      //   height: 100,
      //   backgroundColor: 'black',
      //   alignSelf: 'center',
      //   marginTop: 10,
      //   borderRadius: 10,
      //   flexDirection: 'row',
      // },