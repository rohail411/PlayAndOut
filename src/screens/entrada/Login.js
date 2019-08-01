/**
 * PlayAndOut
 * jorgereyesdev@hotmail.com
 * www.8rios.com
 * @flow
 */


import React, { Component } from 'react';
import {StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Alert, AsyncStorage } from 'react-native';
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
            typedPassword: '',
		};
	}
	
	login = () => 
	{
		global.events.emit('loader_on', '');
		if(this.state.typedEmail !== '' && this.state.typedPassword !== '' )
		{
			var user = this.state.typedEmail;
			global.userId = user.replace(/\./g, "_");
			
			global.tipo_registro = 'login';
			this.guardar_userId();
		}
		else{
			this.alerta();
		}
	}

	guardar_userId = async (value) => {
        try {
			await AsyncStorage.setItem('userId', global.userId);
			this.onLogin();
        } catch (error) {
			this.alerta('Error de datos.');
        }
	}
	
	onLogin = () => {
        global.firebase.auth().signInWithEmailAndPassword(this.state.typedEmail, this.state.typedPassword)
            .then((loggedInUser) => {
				console.log('Splash');
            }).catch((error) => {
				this.alerta();
			});
	}
	
	alerta = () => {
		global.events.emit('loader_off', '');
		Alert.alert(
			'Login',
			'Invalid data.',
			[
			  {text: 'Forgot your password?', onPress: () => this.reset_password()},
			  {text: '', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'Close'},
			],
			{ cancelable: false }
		)
	}

	reset_password = () => {
		this.props.navigation.navigate('Recordar');
	}

	render() {
		return(
			<View style={styles.container}>

				<View style={styles.tituloContainer}>
					<Text style={styles.textTitulo}>Enter your login info:</Text>
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
							ref={(input) => this.email = input}
							onSubmitEditing={()=> this.password.focus()}
							onChangeText={ (text) => { this.setState({ typedEmail: text }); } }
							/> 
					</View>

					<View style={styles.inputBox}>
						<View style={styles.containerIcon}>
							<Icon style={[styles.icon]} name={'lock'}/>
						</View>
						<TextInput
							style={styles.inputTexto}
							underlineColorAndroid='rgba(0,0,0,0)'
							placeholder="Password"
							secureTextEntry={true}
							placeholderTextColor = 'rgba(255, 255,255,0.6)'
							autoCapitalize = 'none'
							ref={(input) => this.password = input}
							onChangeText={ (text) => { this.setState({ typedPassword: text }); } }
							/> 
					</View>

					<TouchableOpacity style={styles.boton} onPress={this.login}>
						<Text style={styles.botonText}>Login</Text>
					</TouchableOpacity> 
				</View>

				<View style={styles.socialContainer}>

					<Text style={styles.textLinea}>──────────  o  ──────────</Text>

					<TouchableOpacity style={styles.boton} onPress={() => this.props.navigation.navigate('Signup')}>
						<Text style={styles.botonText}>Create New Account</Text>
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
		paddingVertical: 10,
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
		alignItems:'center',
		backgroundColor:'#4067b1',
		borderRadius: 5,
		height: 50,
		marginVertical: 4,
		paddingVertical: 8,
	},
	textFb: {
		fontSize:20,
		color:'#ffffff',
		textAlign:'center',
		fontWeight: 'bold',
	},
	textLinea: {
		fontSize:14,
		color:'#ffffff',
		textAlign:'center',
		paddingVertical: 20,
	},



	

	inputContainer: {
		
		paddingHorizontal:30,
		//justifyContent: 'center',
		//backgroundColor:'yellow',
	},
	inputBox: {
		backgroundColor:'rgba(255, 255,255,0.2)',
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 25,
        height: 50,
		marginVertical: 5,
	},
	inputTexto: {
		color:'#ffffff',
		flex:1,
		fontSize:18,
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
	
	botonLog: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems:'center',
		backgroundColor:'#a3d449',
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