/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, Image, StyleSheet, TouchableOpacity, PermissionsAndroid} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Iconf from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global'; 

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};


export default class Places extends Component{
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            //latitude: LATITUDE,
        }
    }

    componentWillUnmount(){
        console.log('mapa_inicio unmount')
	}

	componentDidMount() {

    }



    render() {
        return (
            <View style={styles.container}>
                <GooglePlacesAutocomplete
                    placeholder='Enter location to play...'
                    minLength={2}
                    autoFocus={true}
                    returnKeyType={'default'}
                    fetchDetails={true}
                    listViewDisplayed='auto' 


                    styles={{
                        textInputContainer: {
                        backgroundColor: 'rgba(255,255,255,1)',
                        borderTopWidth: 0,
                        borderBottomWidth:0
                        },
                        textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 38,
                        color: '#5d5d5d',
                        fontSize: 16
                        },
                        predefinedPlacesDescription: {
                        color: '#1faadb'
                        },
                    }}

                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                            global.places.latitude = details.geometry.location.lat;
                            global.places.longitude = details.geometry.location.lng;
                            global.places_name = details.formatted_address;
                            console.log(details.formatted_address);
                            global.events.emit('set_location', '');
                            global.events.emit('set_location_map', '');
                    }}

                    query={{
                        // available options: https://developers.google.com/places/web-service/autocomplete
                        key: 'AIzaSyAgVJ9jJXW8nHMKzsWXRC8hWdf6b3JRJMY',
                        language: 'en', // language of the results
                        //types: '(regions)' // default: 'geocode'
                    }}
                    currentLocation={false}
                    //nearbyPlacesAPI='GoogleReverseGeocoding '
                    //filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} 
                    />

            </View>
        );
    }
}

let styles = StyleSheet.create({
    container: {
        flex: 1,
        //height:100
    },
    map: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0
    },
});