import React,{useState} from 'react';
import { TextInput, Button, Card } from 'react-native-paper';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Header from './Header'

export default Search = ({navigation}) => {

    const [city,setCity] = useState("")
    const [cities,setCities] = useState([])
    const fetchCities = (text) => {
        setCity(text)
        fetch(`https://api.weather.com/v3/location/search?apiKey=6532d6454b8aa370768e63d6ba5a832e&language=en-US&query=${text}&locationType=city&format=json`)      //public apikey
        .then(item => item.json())
        .then(data => {
            setCities(data.location.address.slice(0,9))
        })
        .catch(err => {
            console.log(err)
        })
    }

    const btnClick = async () => {
        try{
            await AsyncStorage.setItem("newcity",city)
            navigation.navigate("home",{city:city})
        } catch(err){
            console.log(err)
        }
    }

    const listClick = async (cityname) => {
        setCity(cityname)
        try{
            await AsyncStorage.setItem("newcity",cityname)
            navigation.navigate("home",{city:cityname})
        } catch(err){
            console.log(err)
        }
    }

    const show = () => {
        if(city){
            return "flex"
        } else {
            return "none"
        }
    }

    return (
        <View style={{flex:1}} > 
            <Header name="Search Screen" />
            <TextInput
            label="city name"
            theme={{colors:{
                primary:"#00aaff"
            }}}
            value={city}
            onChangeText={(text) => {
                fetchCities(text)
            }}
            />
            <TouchableOpacity 
            style={{
                alignSelf:"flex-end",
                flexDirection:"row-reverse",
                width:20,
                marginTop:-20,
                display: show()
            }}
            onPress={() => setCity("")}>
                <MaterialCommunityIcons name="close-circle" size={16} color="#00aaff" />
            </TouchableOpacity>


            <Button
            icon="content-save"
            mode="contained"
            theme={{colors:{
                primary:"#00aaff"
            }}}
            style={{margin:20}}
            onPress={() => btnClick()}
            >
                <Text style={{color:"white"}}>Press Me</Text>
            </Button>

            <FlatList
            data={cities}
            renderItem={({item}) => {
                return (
                    <Card 
                    style={{
                        margin:2, 
                        padding:12
                    }}
                    onPress={() => listClick(item)}
                    >
                        <Text>{item}</Text>
                    </Card>
                    )
                }}
                keyExtractor={item => item}
            />

        </View>

    );
}
