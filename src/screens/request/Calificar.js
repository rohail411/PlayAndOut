/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import global from '../../managers/Global';
import Calificador from '../../components/detalle/Calificador';
import TopBar from '../../components/inicio/TopBarBack';

export default class Calificar extends Component
{
	califica = () => 
	{
		if(global.calificacion > 0)
		{
			global.firebase.database().ref(global.databasePath+'ratings/' + global.ver_perfil.userId + '/' + global.userId).set({
				raterId 	    : global.userId,
				rating   	    : global.calificacion,
				date	        : new Date().toDateString(),
				timestamp       : global.firebase.database.ServerValue.TIMESTAMP,
			});

			this.props.navigation.navigate('PlayerProfile');
		}
	}

	render() {
		return(
			<View style={styles.container}>

				<TopBar {...this.props}/>

				<View style={styles.containerTitulo}>
				<Image  resizeMode = 'cover' style={styles.foto} source={ global.ver_perfil.picture == '' ? require('../../assets/avatar.png') : {uri: global.ver_perfil.picture }  }/>
					<Text style={styles.nombre}>{global.ver_perfil.name}</Text>
				</View>

				<View style={styles.botonContainer}>
					<Calificador/>
					<TouchableOpacity style={styles.boton} onPress={() => this.califica()}>
						<Text style={styles.botonText}>Send</Text>
					</TouchableOpacity> 
				</View>

			</View>	
		)
	}
}

const styles = StyleSheet.create({
	container : {
	  	flex: 1,
		backgroundColor:'#017dc3',
	},

	containerTitulo: {
		flex: 1,
		alignItems:'center',
		justifyContent: 'center',
		paddingHorizontal:10,
		paddingTop: 20,
	},
	foto: {
		alignSelf: 'center',
   	 	height: 100,
		width: 100,
		borderRadius: 50,
		marginBottom: 10,
		backgroundColor:'#000000',
    },
	nombre: {
		fontSize:20,
		fontFamily: 'vagroundedbt',
		color:'#ffffff',
		textAlign:'center'
	},	


	botonContainer: {
		flex:1,
		paddingHorizontal:30,
	},
	boton: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
    	elevation: 4,
		marginTop: 20,
	},
	botonText: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
    },
});