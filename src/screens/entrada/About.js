/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icone from 'react-native-vector-icons/Entypo';
import Iconm from 'react-native-vector-icons/MaterialIcons';
import global from '../../managers/Global';
import TopBar from '../../components/inicio/TopBarBack';

export default class About extends Component
{
	static navigationOptions = {
		title: '',
		headerTintColor: 'white',
		headerStyle: { 	backgroundColor: '#017dc3', shadowOpacity: 0, elevation: 0, }
	};


	constructor(props) {
        super(props);
        this.state = {

		};
	}

	componentDidMount() {
		global.events.emit('loader_off', '');
    }



	

	render() {
		return(
			<View style={styles.container}>

				<TopBar {...this.props}/>
				<ScrollView style={styles.container}>

				

					<View style={styles.tituloContainer}>
						<Text style={styles.textTitulo}>About Play And Out</Text>
					</View>

					<View style={styles.inputContainer}>

						<Text style={styles.comentarios}>{global.about}</Text>

					</View>

				</ScrollView>	
			</View>
		)
	}
}






const styles = StyleSheet.create({
	container : {
	  	flex: 1,
		backgroundColor:'#017dc3',
	},

	tituloContainer: {
		alignItems:'center',
		justifyContent: 'center',
	},
	logo: {
		height: 100,
		width: 100,
	},
	textTitulo: {
		fontSize:30,
		fontFamily: 'vagroundedbt',
		color:'#ffffff',
		textAlign:'center'
	},
	

	inputContainer: {
		paddingHorizontal:20,
		paddingVertical: 30,
	},
	comentarios: {
		color:'#ffffff',
		flex:1,
		fontSize:18,
	},
});