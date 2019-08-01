/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text, PermissionsAndroid} from 'react-native';
import MapView, { Marker } from "react-native-maps";
import Geocoder from 'react-native-geocoding';
import Iconf from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global'; 


const LATITUDE          = 0;
const LONGITUDE         = 0;
const LATITUDE_DELTA    = 0.011;
const LONGITUDE_DELTA   = 0.011;

export default class Mapa extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            sendpos: false,
        }
    }

    componentWillUnmount(){
        console.log('mapa_inicio unmount')
	}

	componentDidMount() {
        Geocoder.init("AIzaSyCKs-IrqwCvD4G-1Dm-pRd73omPAMSoX4k");
        this.requestLocationPermission();
        global.events.addListener('set_location_map', () => this.set_location_map());
    }

    set_location_map() {
        this.setState({
            latitude: global.places.latitude,
            longitude: global.places.longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003
        });
    }

    async requestLocationPermission() {
        const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
            this.initGeolocation();
        } else {
            try {
                    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            'title': 'Location',
                            'message': 'Play and Out requires your permission to access your location.'
                        }
                    )

                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        this.initGeolocation();
                    } else {
                        console.log('no PermissionsAndroid')
                    }

            } catch (err) {
                alert(err)
            }
        }
    };
    initGeolocation() 
    {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                this.setState({
                    latitude,
                    longitude,
                });
                global.user_position.latitude = latitude;
                global.user_position.longitude = longitude;
                
                global.current_position.latitude = latitude;
                global.current_position.longitude = longitude;

            },
            (error) => alert(JSON.stringify(error)),
            //{enableHighAccuracy: true, timeout: 10000, maximumAge: 1000}
        );
    }
    getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: this.state.latitudeDelta,
        longitudeDelta: this.state.longitudeDelta
    });
    onRegionChange(region, lastLat, lastLong) {
        this.state.latitude = region.latitude
        this.state.longitude = region.longitude
        this.state.latitudeDelta = region.latitudeDelta
        this.state.longitudeDelta = region.longitudeDelta

        global.user_position.latitude = region.latitude;
        global.user_position.longitude = region.longitude;
    }
    onRegionChangeComplete(region, lastLat, lastLong) {
        if(global.sendpos){
            Geocoder.from(region.latitude, region.longitude)
            .then(json => {
                var addressComponent = json.results[0].formatted_address;
                global.places_name_drag = addressComponent;
                global.events.emit('set_location_text', '');
                console.log(addressComponent);
            }).catch(error => console.warn(error));
        }
        global.sendpos = true;
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={ true }
                    loadingEnabled = {true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    region={this.getMapRegion()}
                    onRegionChange={this.onRegionChange.bind(this)}
                    onRegionChangeComplete={this.onRegionChangeComplete}
                >
                </MapView>

                

                <View pointerEvents='box-none' style={styles.marca}>
                    <Image pointerEvents='box-none' resizeMode="contain" style={styles.image} source={require('../../assets/mk_recoger.png')} />
                </View>
                <View pointerEvents='box-none' style={styles.container}>

                <View pointerEvents='box-none' style={styles.containerBotones}>
                    <TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Search')}>
                        <Iconf name="search" size={18} color='white' />
                        <Text style={styles.botonText}>Search Requests</Text>
                    </TouchableOpacity>
                </View>

                
                
                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    image: {
        width: 200,
        height: 100,
    },
    marca: {
        flex: 1,
        alignItems:'center',
        justifyContent:'flex-end',
    },

    containerBotones: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        marginBottom:20,
        paddingHorizontal: 10,
    },
    boton: {
        flexDirection: 'row',
        alignItems: 'center',
		justifyContent: 'center',
        backgroundColor:'#a1d348',
		borderRadius: 40,
        width: 150,
        height: 30,
        
    },

    botonText: {
        fontSize:14,
		color:'#ffffff',
        textAlign:'center',
        //fontWeight: 'bold',
        fontFamily: 'vagroundedbt',
        marginLeft: 5
    }
});