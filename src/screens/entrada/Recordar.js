/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import global from '../../managers/Global';

export default class Registro extends Component
{
	static navigationOptions = {
		title: '',
		headerTintColor: 'white',
		headerStyle: { 	backgroundColor: '#017dc3', shadowOpacity: 0, elevation: 0, }
	};

	constructor(props) {
        super(props);
        this.state = {
            typedEmail: '',
		};
	}

	enviarcorreo = () => 
	{
		if(this.state.typedEmail !== '' )
		{
			global.firebase.auth().sendPasswordResetEmail(this.state.typedEmail)
				.then(( ) => {
					alerta();
				}).catch((error) => {
					console.log(error.code);
					if(error.code == 'auth/user-not-found'){
						alerta2()
					}
				});
		}
		else{
			ToastAndroid.show('Enter the email', ToastAndroid.SHORT);
		}

		alerta = () => {
			ToastAndroid.show('Email sent.', ToastAndroid.SHORT);
			this.props.navigation.navigate('Login');
		}
		alerta2 = () => {
			ToastAndroid.show('Email does not exist.', ToastAndroid.SHORT);
		}
	}

	render() {
		return(
			<View style={styles.container}>

				<View style={styles.tituloContainer}>
					<Text style={styles.textTitulo}>Enter your email:</Text>
				</View>

				<View style={styles.inputContainer}>
					
					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'envelope'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Email"
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'none'
							keyboardType={'email-address'}
							onChangeText={ (text) => { this.setState({ typedEmail: text }); } }
							/> 
					</View>

					<TouchableOpacity style={styles.boton} onPress={this.enviarcorreo}>
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

	tituloContainer: {
		alignItems:'center',
		justifyContent: 'center',
		paddingVertical: 20,
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



	socialContainer: {
		flex: 1,
		paddingHorizontal:30,
		paddingTop: 20,
	},
	buttonFb: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor:'#4067b1',
		borderRadius: 20,
		marginVertical: 4,
		paddingVertical: 8,
	},
	textFb: {
		fontSize:16,
		color:'#ffffff',
		textAlign:'center'
	},
	textLinea: {
		fontSize:14,
		color:'#ffffff',
		textAlign:'center',
		paddingVertical: 20,
	},



	

	inputContainer: {
		
		paddingHorizontal:20,
		//justifyContent: 'center',
		//backgroundColor:'yellow',
	},
	inputBox: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 5,
        height: 50,
		marginVertical: 5,
	},
	inputTexto: {
		color:'#ffffff',
		flex:1,
		paddingVertical: 0
	},
	containerIcon: {
		width: 30,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10
	},
	icon: {
		color: 'white',
		fontSize: 20,
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