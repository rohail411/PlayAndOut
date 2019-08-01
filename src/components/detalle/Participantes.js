/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import { StyleSheet, Text,  View, TouchableOpacity, Image } from 'react-native';
import global from '../../managers/Global';
import ItemParticipante from './ItemParticipante';


export default class Participantes extends Component 
{
    getListItems = count => {
        var items = [];
        for (var key in this.props.listing.datos.participants) {
            items.push(
                <ItemParticipante 
                    key = {key}
                    nombre={this.props.listing.datos.participants[key].name} 
                    foto={this.props.listing.datos.participants[key].picture} 
                    link={this.props.listing.datos.participants[key].userId} 
                    {...this.props} 
                />
            );
        }
        return items;
    };

	render(){
		return(
			<View style={styles.container}>
                <View style={styles.section}>

                    <Text style={styles.titulos}>Participants:</Text>
                    <View style={styles.botonesContainer}>
                        { this.getListItems() }
                    </View>

                </View>
  			</View>
		)
	}
}

const styles = StyleSheet.create({
    container : {
        paddingHorizontal: 20,
    },
    
    section : {
        paddingVertical: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: '#0000001A',
    },

    botonesContainer: {
		flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
		justifyContent: 'center',
    },
    titulos: {
		fontSize:15,
        color:'#017dc3',
        fontFamily: 'vagroundedbt',
    },

    boton: {
        marginVertical: 5,
        marginRight: 10,
    },

    foto: {
		alignSelf: 'center',
   	 	height: 50,
		width: 50,
        borderRadius: 100,
    },


    nombre: {
		fontSize:12,
		textAlign:'center'
	},
});