/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import global from '../../managers/Global';



export default class Bienvenida extends Component
{
	continuar = () => {
		this.props.navigation.navigate('Dummy')
	}


	componentDidMount() {
		global.events.emit('loader_off', '');
	}

	componentWillReceiveProps(newProps) {
		global.events.emit('loader_off', '');
    }

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.avatarContainer}>
					<Image  resizeMode = 'cover' style={styles.foto} source={ global.user.picture == '' ? require('../../assets/avatar.png') : {uri: global.user.picture}  }/>
					<Text style={styles.tituloText}>Welcome!</Text>
					<Text style={styles.tituloTextA}>{global.user.name}</Text>
				</View>				

				<View style={styles.botonContainer}>
					<Text style={styles.tituloTextB}>Find and meet new friends and go to play fun games with them!</Text>
					<TouchableOpacity style={styles.boton} onPress={this.continuar}>
						<Text style={styles.botonText}>Continue</Text>
					</TouchableOpacity> 
				</View>
			</View>	
		)
	}
}



const styles = StyleSheet.create({
	container : {
		flex: 1,
		paddingHorizontal:30,
		backgroundColor:'#017dc3',
	},
	avatarContainer: {
		flex:1,
		paddingVertical: 30,
		alignItems: 'center',
		justifyContent: 'center',
	},

	foto: {
		alignSelf: 'center',
   	 	height: 100,
		width: 100,
		borderRadius: 50,
		marginHorizontal: 3,
		marginBottom: 20,
	},
	tituloText: {
		fontSize:30,
		fontFamily: 'vagroundedbt',
		color:'#ffffff',
		textAlign:'center'
	},
	tituloTextA: {
		fontSize:20,
		fontFamily: 'vagroundedbt',
		color:'#ffffff',
		textAlign:'center'
	},
	tituloTextB: {
		color:'#ffffff',
		textAlign:'center',
		fontFamily: 'vagroundedbt',
	},



	botonContainer: {
		flex:1,
		//alignItems: 'center',
		justifyContent: 'center',
	},
	boton: {
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#ce252d',
        borderRadius: 25,
		height: 50,
    	elevation: 4,
		marginTop: 20,
		marginTop: 30,
	},
	botonText: {
		fontFamily: 'vagroundedbt',
		fontSize:20,
		color:'#ffffff',
		textAlign:'center'
	},
});