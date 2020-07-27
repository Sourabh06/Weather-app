import React,{useState,useEffect} from 'react';
import {Card,Title} from 'react-native-paper';
import {Text, View, Image} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Header from './Header';
import {APIKEY} from '../config/dev'

const Home = (props) => {

    const [info,setInfo] = useState({
        name:"loading..",
        temp:"loading",
        mintemp:"...",
        maxtemp:"...",
        humidity:"loading",
        icon:"loading",
        desc:"loading",
        feels:"...",
        wind:"...",
        pressure:"..."
    })
    useEffect(() => {
        getWeather()
    },[])

    const getWeather = async () => {
        let MyCity = await AsyncStorage.getItem("newcity");
        if(!MyCity){
            const {city} = props.route.params
            MyCity = city
        }
        
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${MyCity}&appid=${APIKEY}&units=metric`)
        .then(data => data.json())
        .then(results => {
            setInfo({
                name:results.name,
                temp:results.main.temp,
                mintemp:results.main.temp_min,
                maxtemp:results.main.temp_max,
                feels:results.main.feels_like,
                humidity:results.main.humidity,
                desc:results.weather[0].description,
                wind:results.wind.speed,
                pressure:results.main.pressure,
                icon:results.weather[0].icon
            })
        })
        .catch(err => {
            console.log(info)
            alert(err.message)
        })
    }

    if(props.route.params.city !== "london"){
        getWeather()
    }

    return (
        <View style={{flex:1}}>
            <Header name="Weather App" />
            <View>
                <Title
                style={{
                    color:"#00aaff",
                    marginTop:30,
                    fontSize:30,
                    alignSelf:"center"
                }}
                >                
                    {info.name}
                </Title>

                <View style={{flexDirection:"row"}}>
                    <Image 
                    style={{
                        width:100,
                        height:100
                    }}
                    source={{uri:`https://openweathermap.org/img/w/${info.icon}.png`}}
                    />
                    <Title style={{
                        marginTop:30,
                        paddingLeft:20,
                        fontSize:30,
                        color:"#00aaff"
                    }}>
                        {info.temp}°C
                    </Title>
                </View>

            </View>
            <Card style={{
                margin:5,
                padding:12
            }}>
                <View style={{flexDirection:"row", justifyContent:"space-around"}}>
                    <Title style={{
                        color:"#00aaff"
                    }}>
                        Min: {info.mintemp}°C
                    </Title>
                    <Title style={{
                        color:"#00aaff",
                    }}>
                        Max: {info.maxtemp}°C
                    </Title>
                </View>
            </Card>
            <Card style={{
                margin:5,
                padding:12
            }}>
                <Title style={{
                    color:"#00aaff"
                }}>
                    Humidity - {info.humidity} %
                </Title>
            </Card>
            <Card style={{
                margin:5,
                padding:12
            }}>
                <Title style={{
                    color:"#00aaff"
                }}>
                    Description - {info.desc}
                </Title>
                <Text style={{ color:"#00aaff" }}>
                    Feels like {info.feels}°C
                </Text>
                <Text style={{ color:"#00aaff" }}>
                    Wind: {info.wind}m/s,
                    Pressure: {info.pressure}hPa
                </Text>
            </Card>
        </View>
    )
}

export default Home