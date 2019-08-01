/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import global       from '../../managers/Global';

export default class Info extends Component {
    constructor (props) {
        super(props)
        this.state = {
            nombre: 'Jorge Reyes',
        }
    }

    componentDidMount() {
        //console.log('Info ' + this.state.nombre)
    }

    render() {
        return (
            <View style={styles.container}>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Place to play:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.place}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Number of players:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.players}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Type of players:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.genre}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Age of players:</Text>
                        <Text style={styles.nombre}>Min: {this.props.listing.datos.minimun} years old - Max: {this.props.listing.datos.maximum} years old</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Date to play:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.date}</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.left}>
                        <Text style={styles.titulos}>Time to play:</Text>
                        <Text style={styles.nombre}>{this.props.listing.datos.time}</Text>
                    </View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
    },
    section : {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0000001A',
    },

    left: {
        borderWidth: 0,
    },
    right: {
        flex:1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    foto: {
		alignSelf: 'center',
   	 	height: 80,
		width: 80,
        borderRadius: 100,
        marginRight: 10
    },
    titulos: {
		fontSize:15,
        color:'#017dc3',
        fontFamily: 'vagroundedbt',
    },
    nombre: {
        fontSize:18,
        color:'#000',
    },

    comentarios: {
        fontSize:15,
        color:'#f68d2c',
        fontWeight: 'bold',
    },



});