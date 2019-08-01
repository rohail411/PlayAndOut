/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, { Marker } from "react-native-maps";

export default class Mapa extends Component{

    componentWillUnmount(){
        console.log('mapa_on_create unmount')
    }
    
    getMapRegion = () => ({
        latitude:       this.props.latitude,
        longitude:      this.props.longitude,
        latitudeDelta:  0.004,
        longitudeDelta: 0.004
    });
    getPosRegion = () => ({
        latitude:   this.props.latitude,
        longitude:  this.props.longitude,
    });

    render() {
        return (
            <View style={styles.container}>
                <MapView 
                    style={styles.map}
                    provider={MapView.PROVIDER_GOOGLE}
                    showsUserLocation={ false }
                    loadingEnabled = {true}
                    loadingIndicatorColor="#666666"
                    loadingBackgroundColor="#eeeeee"
                    region={this.getMapRegion()}
                >
                    <Marker
                        coordinate={this.getPosRegion()} 
                        image={require('../../assets/mk_usuario.png')}  
                    /> 
                </MapView>

                <View pointerEvents='box-none' style={styles.marca}>
                
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
        bottom: 0,
    },
    marca: {
        flex: 1,
        height:150
    },
});